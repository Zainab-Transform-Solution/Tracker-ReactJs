import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        {/* Toast system available globally */}
        <Toaster position="top-right"/>
        <AppRoutes />
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
