     import React from "react";
     import { Settings, RefreshCw } from "lucide-react";
     import { useAuth } from "../context/AuthContext";

     const AdminLayout = ({
          children,
          activeTab,
          setActiveTab,
          onFactoryReset,
     }) => {
          const { canManageUsers, canManageProjects, isSuperAdmin } = useAuth();

          const activeTabClass =
               "px-6 py-3 font-medium text-sm transition-colors border-b-2 border-blue-600 text-blue-700";
          const inactiveTabClass =
               "px-6 py-3 font-medium text-sm transition-colors border-b-2 border-transparent text-slate-500 hover:text-slate-700";

          const showUsersTab = canManageUsers;
          const showProjectsTab = canManageProjects;

          return (
               <div className="max-w-7xl mx-auto space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                         {/* Header */}
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                              <div className="flex items-center gap-3">
                                   <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                                        <Settings className="w-6 h-6" />
                                   </div>
                                   <div>
                                        <h2 className="text-xl font-bold text-slate-800">
                                             Administration & Management
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                             Manage organization resources, users, and targets.
                                        </p>
                                   </div>
                              </div>

                              {isSuperAdmin && (
                                   <button
                                        onClick={onFactoryReset}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg text-sm font-bold transition-colors"
                                   >
                                        <RefreshCw className="w-4 h-4" />
                                        Factory Reset DB
                                   </button>
                              )}
                         </div>

                         {/* Tabs */}
                         {(showUsersTab || showProjectsTab) && (
                              <div className="flex border-b border-slate-200 mb-6">
                                   {showUsersTab && (
                                        <button
                                             onClick={() => setActiveTab("users")}
                                             className={
                                                  activeTab === "users" ? activeTabClass : inactiveTabClass
                                             }
                                        >
                                             User Management
                                        </button>
                                   )}

                                   {showProjectsTab && (
                                        <button
                                             onClick={() => setActiveTab("projects")}
                                             className={
                                                  activeTab === "projects"
                                                       ? activeTabClass
                                                       : inactiveTabClass
                                             }
                                        >
                                             Projects & Targets
                                        </button>
                                   )}
                              </div>
                         )}

                         {/* Content */}
                         <div>{children}</div> 
                    </div>
               </div>
          );
     };

     export default AdminLayout;
