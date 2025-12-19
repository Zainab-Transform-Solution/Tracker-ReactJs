import React, { useEffect, useState, useCallback, useRef } from "react";
// import AdminLayout from "./AdminLayout";
import UsersManagement from "./UsersManagement";
import ProjectsManagement from ".././project/ProjectsManagement";
import { fetchUsersByRole } from "../../../../services/authService";
import { useAuth } from "../../../../context/AuthContext";
import { toast } from "react-hot-toast";

const ManageModule = ({ activeTab, projects, onUpdateProjects }) => {
     const [users, setUsers] = useState([]);
     const [loadingUsers, setLoadingUsers] = useState(false);
     const hasFetchedRef = React.useRef(false);
     const { user, canManageUsers, canManageProjects } = useAuth(); // 👈 role comes from localStorage via context

     const userRole = user?.user_role;

     const loadUsers = useCallback(async () => {
          if (!userRole) return;
          try {
               console.log("🚀 Calling user list API");
               setLoadingUsers(true);

               const res = await fetchUsersByRole(userRole);

               if (res.status === 200) {
                    const formattedUsers = res.data.map(u => ({
                         id: u.user_id,
                         name: u.user_name,
                         email: u.user_email,
                         phone: u.user_number,
                         role: u.user_role.toUpperCase(),
                         designation: u.designation || "",
                         reportingManager: u.reporting_to || "",
                    }));

                    setUsers(formattedUsers);
               } else {
                    throw new Error(res.message);
               }
          } catch (err) {
               console.error("Fetch users failed", err);
               toast.error("Failed to load users");
          } finally {
               setLoadingUsers(false);
          }
     }, []);

     useEffect(() => {
          if (activeTab === "users" && !hasFetchedRef.current) {
               hasFetchedRef.current = true;
               loadUsers();
          }
     }, [activeTab, loadUsers]);

     return (
          <>
               {activeTab === "users" && canManageUsers && (
                    <UsersManagement
                         users={users}
                         onUpdateUsers={setUsers}
                         loading={loadingUsers}
                         loadUsers={loadUsers}
                    />
               )}

               {activeTab === "projects" && canManageProjects && (
                    <ProjectsManagement
                         projects={projects}
                         onUpdateProjects={onUpdateProjects}
                    />
               )}
          </>
     );
};

export default ManageModule;
