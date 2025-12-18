import React, { useState, useMemo, useEffect } from "react";
import {
     UserPlus,
     Key,
} from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import AddUserFormModal from "./AddUserFormModal";
import UsersTable from "./UsersTable";
import TaskAssignmentModal from "./TaskAssignmentModal";
import { addUser, updateUser } from "../../../../services/authService"; // Import the API function
import { toast } from "react-hot-toast";
import { useUserDropdowns } from "../../../../hooks/useUserDropdowns";
import { useDeviceInfo } from "../../../../hooks/useDeviceInfo";
import DeleteUserModal from "./DeleteUserModal";
import { deleteUser } from "../../../../services/authService";

const UsersManagement = ({
     users = [],
     projects = [],
     loading,
     onUpdateUsers,
     pendingRequests = [],
     onResolveRequest,
     loadUsers
}) => {
     const { isSuperAdmin, canViewSalary } = useAuth();
     const [assigningUser, setAssigningUser] = useState(null);
     const [isAssigningNewUser, setIsAssigningNewUser] = useState(false);
     const [editingUserId, setEditingUserId] = useState(null);
     const [editForm, setEditForm] = useState({});
     const [showUserFormModal, setShowUserFormModal] = useState(false);
     const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
     const [userPermissions, setUserPermissions] = useState({
          user_creation_permission: 0,
          project_creation_permission: 0,
     });
     const [formErrors, setFormErrors] = useState({});
     const [profilePicture, setProfilePicture] = useState(null); // For storing file object
     const [profilePreview, setProfilePreview] = useState(null); // For preview URL
     const [base64Image, setBase64Image] = useState(null); // For base64 conversion
     const [isEditMode, setIsEditMode] = useState(false);
     const [userToDelete, setUserToDelete] = useState(null);
     const [isDeleting, setIsDeleting] = useState(false);

     const {
          dropdowns,
          loading: dropdownLoading,
          loadDropdowns
     } = useUserDropdowns();

     const deviceInfo = useDeviceInfo();

     // Check permissions on component mount
     useEffect(() => {
          const userData = JSON.parse(localStorage.getItem("user") || "{}");
          if (userData) {
               setUserPermissions({
                    user_creation_permission: userData.user_creation_permission || 0,
                    project_creation_permission:
                         userData.project_creation_permission || 0,
               });
          }
     }, []);

     const initialNewUserState = {
          role: "",
          password: "",
          designation: "",
          reportingManager: "",
          email: "",
          name: "",
          phone: "",
          address: "",
     };

     const [filterUser, setFilterUser] = useState({
          empId: "",
          name: "",
          email: "",
          reportingManager: "",
          role: "AGENT",
          assignedTasks: [],
     });

     const [newUser, setNewUser] = useState(initialNewUserState);
     const [editFormData, setEditFormData] = useState(initialNewUserState);

     const potentialManagers = useMemo(
          () =>
               users.filter(
                    (u) =>
                         [
                              "Ops Manager",
                              "Asst. Project Manager",
                              "CEO",
                              "Project Manager",
                         ].includes(u.designation || "") ||
                         u.role === "ADMIN" ||
                         u.role === "PROJECT_MANAGER"
               ),
          [users]
     );

     const clearFieldError = (field) => {
          setFormErrors((prev) => {
               if (!prev[field]) return prev;
               const updated = { ...prev };
               delete updated[field];
               return updated;
          });
     };

     // Function to convert image to base64
     const convertToBase64 = (file) => {
          return new Promise((resolve, reject) => {
               const reader = new FileReader();
               reader.readAsDataURL(file);
               reader.onload = () => resolve(reader.result);
               reader.onerror = error => reject(error);
          });
     };

     // Handle profile picture change
     const handleProfilePictureChange = async (file) => {
          if (!file) return;

          // Validate file type
          const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
          if (!validTypes.includes(file.type)) {
               toast.error("Please select a valid image file (JPEG, PNG, GIF, WebP)");
               return;
          }

          // Validate file size (5MB max)
          if (file.size > 5 * 1024 * 1024) {
               toast.error("Image size should be less than 5MB");
               return;
          }

          setProfilePicture(file);

          // Create preview URL
          const previewUrl = URL.createObjectURL(file);
          setProfilePreview(previewUrl);

          // Convert to base64
          try {
               const base64 = await convertToBase64(file);
               setBase64Image(base64);
          } catch (error) {
               console.error("Error converting image to base64:", error);
               toast.error("Failed to process image");
          }
     };

     // Handle profile picture removal
     const handleRemoveProfilePicture = () => {
          if (profilePreview) {
               URL.revokeObjectURL(profilePreview); // Clean up memory
          }
          setProfilePicture(null);
          setProfilePreview(null);
          setBase64Image(null);
     };

     // Clean up preview URLs on unmount
     useEffect(() => {
          return () => {
               if (profilePreview) {
                    URL.revokeObjectURL(profilePreview);
               }
          };
     }, [profilePreview]);

     // Updated handleAddUser function with API call
     const handleAddUser = async () => {
          const errors = {};

          if (!newUser.name?.trim()) {
               errors.name = "Please enter name";
          }

          if (!newUser.email?.trim()) {
               errors.email = "Please enter email";
          } else if (!/^\S+@\S+\.\S+$/.test(newUser.email)) {
               errors.email = "Enter a valid email address";
          }

          if (!newUser.role) {
               errors.role = "Please enter role";
          }

          if (!newUser.password?.trim()) {
               errors.password = "Please enter password";
          } else if (newUser.password.length < 6) {
               errors.password = "Password must be at least 6 characters";
          }

          // ❌ Stop here if validation fails
          if (Object.keys(errors).length > 0) {
               setFormErrors(errors);
               return;
          }

          // ✅ Clear errors if valid
          setFormErrors({});
          setIsSubmitting(true);

          // Prepare the user data according to API requirements
          const userData = {
               user_name: newUser.name.trim(),
               user_email: newUser.email || "",
               user_number: newUser.phone || "",
               user_address: newUser.address || "",
               user_role: newUser.role.toLowerCase(), // Convert to lowercase for API
               user_designation: newUser.designation || "Agent",
               reporting_manager: newUser.reportingManager || "",
               user_password: newUser.password || "123456",
               profile_picture: base64Image || null,
               // FORCE SYSTEM DATA AT END
               device_id: deviceInfo.device_id,
               device_type: deviceInfo.device_type,
          };

          try {
               const response = await addUser(userData);

               if (response.status === 200 || response.status === 201) {
                    // API call successful
                    const apiUser = response;

                    setShowUserFormModal(false);

                    // Show success message
                    toast.success("User created successfully!", {
                         className: "toast-success toast-animate",
                         duration: 4000,
                    });

                    // Refresh the users list
                    loadUsers();

               } else {
                    throw new Error(response.message || "Failed to create user");
               }
          } catch (error) {
               console.error("Error adding user:", error);
               toast.error(`Error creating user: ${error.message}`, {
                    className: "toast-error toast-animate",
                    duration: 4000,
               });
          } finally {
               setIsSubmitting(false);

               // Reset form and close modal
               setNewUser(initialNewUserState);
               handleRemoveProfilePicture(); // Clear profile picture
               setShowUserFormModal(false);
          }
     };

     // Permission checkbox handler
     const handlePermissionChange = (permission, value) => {
          setNewUser((prev) => ({
               ...prev,
               permissions: {
                    ...prev.permissions,
                    [permission]: value,
               },
          }));
     };

     // Update the close modal function
     const handleCloseUserModal = () => {
          setShowUserFormModal(false);
          setIsEditMode(false);
          setEditingUserId(null);
          setFormErrors({});
          setNewUser(initialNewUserState);
          setEditFormData(initialNewUserState);
          handleRemoveProfilePicture();
     };

     // Open user form modal
     const openUserFormModal = async () => {
          setShowUserFormModal(true);
          await loadDropdowns(); // loads all dropdowns in parallel
     };

     const openEditUserModal = async (user) => {
          setEditingUserId(user.id);
          setIsEditMode(true);

          // Convert user data to match form structure
          const formData = {
               id: user.id,
               name: user.name || "",
               email: user.email || "",
               role: user.role || "",
               phone: user.phone || "",
               designation: user.designation || "",
               reportingManager: user.reportingManager || "",
               address: user.address || "",
               password: "", // Password field will be hidden in edit mode
          };

          console.log(formData);

          setEditFormData(formData);
          setNewUser(formData);

          // Load dropdowns
          await loadDropdowns();

          setShowUserFormModal(true);
     };

     // Add this function to handle update API call
     const handleUpdateUser = async () => {
          const errors = {};

          if (!editFormData.name?.trim()) {
               errors.name = "Please enter name";
          }

          if (!editFormData.email?.trim()) {
               errors.email = "Please enter email";
          } else if (!/^\S+@\S+\.\S+$/.test(editFormData.email)) {
               errors.email = "Enter a valid email address";
          }

          if (!editFormData.role) {
               errors.role = "Please enter role";
          }

          // Password is optional in update mode
          if (editFormData.password && editFormData.password.length < 6) {
               errors.password = "Password must be at least 6 characters";
          }

          if (Object.keys(errors).length > 0) {
               setFormErrors(errors);
               return;
          }

          setFormErrors({});
          setIsSubmitting(true);

          // Prepare update data
          const updateData = {
               user_id: editingUserId,
               user_name: editFormData.name.trim(),
               user_email: editFormData.email,
               user_number: editFormData.phone || "",
               user_address: editFormData.address || "",
               user_role: editFormData.role.toLowerCase(),
               user_designation: editFormData.designation || "Agent",
               reporting_manager: editFormData.reportingManager || "",
          };

          // Only include password if provided
          if (editFormData.password?.trim()) {
               updateData.user_password = editFormData.password;
          }

          // Include profile picture if changed
          if (base64Image) {
               updateData.profile_picture = base64Image;
          }

          try {
               console.log("🟢 UPDATE USER REQUEST PAYLOAD:", updateData);

               // Call update API (you'll need to create this service)
               const response = await updateUser(updateData);

               if (response.status === 200) {
                    toast.success("User updated successfully!", {
                         className: "toast-success toast-animate",
                         duration: 4000,
                    });

                    // Refresh the users list
                    loadUsers();

                    // Close modal and reset
                    handleCloseUserModal();
               } else {
                    throw new Error(response.message || "Failed to update user");
               }
          } catch (error) {
               console.error("Error updating user:", error);
               toast.error(`Error updating user: ${error.message}`, {
                    className: "toast-error toast-animate",
                    duration: 4000,
               });
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleDeleteUser = (user) => {
          // if (
          //      window.confirm(
          //           "Are you sure? This will not delete their historical logs."
          //      )
          // ) {
          //      onUpdateUsers(users.filter((u) => u.id !== id));
          // }
          setUserToDelete(user);
     };

     const confirmDeleteUser = async () => {
          if (!userToDelete) return;

          try {
               setIsDeleting(true);

               const res = await deleteUser(userToDelete.id);

               if (res.status === 200) {
                    toast.success("User deleted successfully!", {
                         className: "toast-success toast-animate",
                         duration: 4000,
                    });
                    setUserToDelete(null);

                    // 🔁 Refresh list from backend
                    loadUsers();
               } else {
                    throw new Error(res.message);
               }
          } catch (err) {
               console.error(err);
               toast.error("Failed to delete user");
          } finally {
               setIsDeleting(false);
          }
     };

     const handleSaveUser = () => {
          if (!editingUserId || !editForm) return;

          const updatedUsers = users.map((u) => {
               if (u.id === editingUserId) {
                    const updated = { ...u, ...editForm };
                    if (!editForm.password) {
                         updated.password = u.password;
                    }
                    return updated;
               }
               return u;
          });

          onUpdateUsers(updatedUsers);
          setEditingUserId(null);
          setEditForm({});
     };

     const handleCancelEdit = () => {
          setEditingUserId(null);
          setEditForm({});
     };

     const handleSendInvite = (email) => {
          if (!email) return;
          alert(`Simulated: Portal invite sent to ${email}`);
     };

     const handleToggleTaskAssignment = (projectId, taskId) => {
          if (!assigningUser) return;

          const currentAssignments = assigningUser.assignedTasks || [];
          const exists = currentAssignments.some(
               (a) => a.projectId === projectId && a.taskId === taskId
          );

          let newAssignments;
          if (exists) {
               newAssignments = currentAssignments.filter(
                    (a) => !(a.projectId === projectId && a.taskId === taskId)
               );
          } else {
               newAssignments = [...currentAssignments, { projectId, taskId }];
          }

          setAssigningUser({ ...assigningUser, assignedTasks: newAssignments });

          const updatedUsers = users.map((u) =>
               u.id === assigningUser.id ? { ...u, assignedTasks: newAssignments } : u
          );

          onUpdateUsers(updatedUsers);
     };

     const handleToggleNewUserTask = (projectId, taskId) => {
          const currentAssignments = newUser.assignedTasks || [];
          const exists = currentAssignments.some(
               (a) => a.projectId === projectId && a.taskId === taskId
          );

          let newAssignments;
          if (exists) {
               newAssignments = currentAssignments.filter(
                    (a) => !(a.projectId === projectId && a.taskId === taskId)
               );
          } else {
               newAssignments = [...currentAssignments, { projectId, taskId }];
          }

          setNewUser({ ...newUser, assignedTasks: newAssignments });
     };

     return (
          <div className="space-y-8 animate-fade-in p-4 md:p-0">
               {/* Password Requests Section */}
               {isSuperAdmin && pendingRequests.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                         <h3 className="text-sm font-bold text-yellow-800 mb-2 flex items-center gap-2">
                              <Key className="w-4 h-4" /> Pending Password Reset Requests
                         </h3>
                         <div className="space-y-2">
                              {pendingRequests.map((req) => (
                                   <div
                                        key={req.id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-2 rounded border border-yellow-100 shadow-sm gap-2 sm:gap-0"
                                   >
                                        <div className="text-xs">
                                             <span className="font-bold text-slate-700">
                                                  {req.email}
                                             </span>
                                             <span className="text-slate-500 mx-1">•</span>
                                             <span className="text-blue-600 underline break-words">
                                                  {req.email}
                                             </span>
                                             <span className="text-slate-400 ml-0 sm:ml-2 block sm:inline">
                                                  {new Date(req.timestamp).toLocaleString()}
                                             </span>
                                        </div>
                                        <button
                                             onClick={() => onResolveRequest(req)}
                                             className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded font-bold transition-colors self-end sm:self-center"
                                        >
                                             Reset & Notify
                                        </button>
                                   </div>
                              ))}
                         </div>
                    </div>
               )}

               {/* Add User Form */}
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase flex items-center gap-2">
                         <UserPlus className="w-4 h-4" /> Add New User
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 items-end">
                         <div className="col-span-1">
                              <label className="block text-xs font-semibold text-slate-500 mb-1">
                                   Emp ID
                              </label>
                              <input
                                   type="text"
                                   className="w-full p-2 border rounded text-sm outline-none focus:border-blue-500"
                                   placeholder="e.g. 1150"
                                   value={filterUser.empId}
                                   onChange={(e) =>
                                        setFilterUser({ ...filterUser, empId: e.target.value })
                                   }
                              />
                         </div>
                         <div className="col-span-1">
                              <label className="block text-xs font-semibold text-slate-500 mb-1">
                                   Full Name
                              </label>
                              <input
                                   type="text"
                                   className="w-full p-2 border rounded text-sm outline-none focus:border-blue-500"
                                   placeholder="e.g. John Doe"
                                   value={filterUser.name}
                                   onChange={(e) => setFilterUser({ ...filterUser, name: e.target.value })}
                                   required
                              />
                         </div>
                         <div className="col-span-1">
                              <label className="block text-xs font-semibold text-slate-500 mb-1">
                                   Email
                              </label>
                              <input
                                   type="email"
                                   className="w-full p-2 border rounded text-sm outline-none focus:border-blue-500"
                                   placeholder="user@co.com"
                                   value={filterUser.email}
                                   onChange={(e) =>
                                        setFilterUser({ ...filterUser, email: e.target.value })
                                   }
                              />
                         </div>
                         <div className="col-span-1">
                              <label className="block text-xs font-semibold text-slate-500 mb-1">
                                   Manager Name
                              </label>
                              <select
                                   className="w-full p-2 border rounded text-sm outline-none focus:border-blue-500"
                                   value={filterUser.reportingManager}
                                   onChange={(e) =>
                                        setFilterUser({ ...filterUser, reportingManager: e.target.value })
                                   }
                              >
                                   <option value="">Select Manager</option>
                                   {potentialManagers.map((u) => (
                                        <option key={u.id} value={u.name}>
                                             {u.name}
                                        </option>
                                   ))}
                              </select>
                         </div>
                         <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">
                                   Role
                              </label>
                              <select
                                   className="w-full p-2 border rounded text-sm outline-none focus:border-blue-500"
                                   value={filterUser.role}
                                   onChange={(e) => setFilterUser({ ...filterUser, role: e.target.value })}
                                   disabled={!isSuperAdmin && FilterUser.role !== "AGENT"}
                              >
                                   <option value="AGENT">Agent</option>
                                   {isSuperAdmin && (
                                        <>
                                             <option value="PROJECT_MANAGER">PM</option>
                                             <option value="ASS_MANAGER">Assistant Manager</option>
                                             <option value="FINANCE_HR">Fin/HR</option>
                                             <option value="ADMIN">Admin</option>
                                        </>
                                   )}
                              </select>
                         </div>
                         <div className="flex gap-2 col-span-2 lg:col-span-1">
                              {filterUser.role === "AGENT" && (
                                   <button
                                        onClick={() => setFilterUser(true)}
                                        className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-2 rounded text-sm font-bold hover:bg-blue-100 flex-1 whitespace-nowrap"
                                   >
                                        Tasks ({filterUser.assignedTasks?.length || 0})
                                   </button>
                              )}
                              {/* Only show Add User button if user has user_creation_permission = 1 */}
                              {userPermissions.user_creation_permission === 1 && (
                                   <button
                                        onClick={openUserFormModal}
                                        className="bg-blue-600 text-white px-6 py-2 rounded text-sm font-bold hover:bg-blue-700 flex-1 whitespace-nowrap flex items-center justify-center gap-2"
                                   >
                                        <UserPlus className="w-4 h-4" /> Add User
                                   </button>
                              )}
                         </div>
                    </div>
               </div>

               {/* Users Table Component */}
               {loading ? (
                    <div className="text-center py-8 text-slate-500">
                         Loading users...
                    </div>
               ) : (
                    <UsersTable
                         users={users}
                         editingUserId={editingUserId}
                         editForm={editForm}
                         setEditForm={setEditForm}
                         handleUpdateUser={handleUpdateUser}
                         handleSaveUser={handleSaveUser}
                         handleCancelEdit={handleCancelEdit}
                         handleDeleteUser={handleDeleteUser}
                         handleSendInvite={handleSendInvite}
                         setAssigningUser={setAssigningUser}
                         potentialManagers={potentialManagers}
                         isSuperAdmin={isSuperAdmin}
                         canViewSalary={canViewSalary}
                         openEditUserModal={openEditUserModal}
                    />
               )}

               {/* User Form Modal */}
               {showUserFormModal && (
                    <AddUserFormModal
                         newUser={isEditMode ? editFormData : newUser}
                         setNewUser={isEditMode ? setEditFormData : setNewUser}
                         handleAddUser={handleAddUser}
                         handleUpdateUser={handleUpdateUser}
                         roles={dropdowns.roles}
                         designations={dropdowns.designations}
                         reportingManagers={dropdowns.reportingManagers}
                         isDropdownLoading={dropdownLoading}
                         isSuperAdmin={isSuperAdmin}
                         isSubmitting={isSubmitting}
                         formErrors={formErrors}
                         clearFieldError={clearFieldError}
                         handleCloseUserModal={handleCloseUserModal}
                         handleProfilePictureChange={handleProfilePictureChange}
                         handleRemoveProfilePicture={handleRemoveProfilePicture}
                         profilePreview={profilePreview}
                         isEditMode={isEditMode}
                         editUserId={editingUserId}
                    />
               )}

               {/* Task Assignment Modal */}
               {(assigningUser || isAssigningNewUser) && (
                    <TaskAssignmentModal
                         assigningUser={assigningUser}
                         isAssigningNewUser={isAssigningNewUser}
                         projects={projects}
                         newUser={newUser}
                         onToggleTaskAssignment={handleToggleTaskAssignment}
                         onToggleNewUserTask={handleToggleNewUserTask}
                         onClose={() => {
                              setAssigningUser(null);
                              setIsAssigningNewUser(false);
                         }}
                    />
               )}

               {/* Delete Modal */}
               {userToDelete && (
                    <DeleteUserModal
                         user={userToDelete}
                         onClose={() => setUserToDelete(null)}
                         onConfirm={confirmDeleteUser}
                         isDeleting={isDeleting}
                    />
               )}

          </div>
     );
};

export default UsersManagement;