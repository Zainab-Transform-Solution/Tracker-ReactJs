import { createContext, useState, useContext, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Permission helper functions
  const hasPermission = (permissionKey) => {
    if (!user) return false;
    return user[permissionKey] === 1;
  };

  // Derived permission states
  const permissions = useMemo(() => {
    if (!user) return {};
    
    return {
      canManageUsers: user.user_creation_permission === 1 || user.role_name === 'admin',
      canManageProjects: user.project_creation_permission === 1 || user.role_name === 'admin',
      isSuperAdmin: user.role_name === 'admin' || user.user_designation === 'Ops Manager',
      canViewSalary: user.role_name === 'admin' || user.user_role === 'FINANCE_HR',
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      ...permissions,
      hasPermission 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);