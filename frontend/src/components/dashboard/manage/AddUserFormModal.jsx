// import React from "react";
// import { UserPlus, X } from "lucide-react";

// const AddUserFormModal = ({
//      newUser,
//      setNewUser,
//      handleAddUser,
//      handlePermissionChange,
//      potentialManagers,
//      isSuperAdmin,
//      handleCloseUserModal,
//      isSubmitting,
//      formErrors = {},
//      clearFieldError
// }) => {
//      return (
//           <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//                <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">
//                     <div className="p-4 bg-blue-800 text-white flex justify-between items-center shrink-0">
//                          <div>
//                               <h2 className="text-lg font-bold flex items-center gap-2">
//                                    <UserPlus className="w-5 h-5 text-blue-300" />
//                                    Create New User
//                               </h2>
//                               <p className="text-blue-200 text-xs">
//                                    Fill all required details to create a new user account
//                               </p>
//                          </div>
//                          <button
//                               onClick={handleCloseUserModal}
//                               className="p-1 hover:bg-white/10 rounded-full transition-colors"
//                          >
//                               <X className="w-5 h-5 text-white" />
//                          </button>
//                     </div>

//                     <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white">
//                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//                               {/* Full Name */}
//                               <div>
//                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Full Name *
//                                    </label>
//                                    <input
//                                         type="text"
//                                         className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
//                                              focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         placeholder="John Doe"
//                                         value={newUser.name}
//                                         onChange={(e) => {
//                                              setNewUser({ ...newUser, name: e.target.value });
//                                              clearFieldError("name");
//                                         }} required
//                                    />
//                                    {formErrors.name && (
//                                         <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>
//                                    )}
//                               </div>

//                               {/* Email */}
//                               <div>
//                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Email Address *
//                                    </label>
//                                    <input
//                                         type="email"
//                                         className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
//                                              focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         placeholder="user@company.com"
//                                         value={newUser.email}
//                                         onChange={(e) => {
//                                              setNewUser({ ...newUser, email: e.target.value });
//                                              clearFieldError("email");
//                                         }} />
//                                    {formErrors.email && (
//                                         <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>
//                                    )}
//                               </div>

//                               {/* Phone */}
//                               <div>
//                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Phone Number
//                                    </label>
//                                    <input
//                                         type="tel"
//                                         className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
//                                              focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         placeholder="1234567890"
//                                         value={newUser.phone}
//                                         onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
//                                    />
//                               </div>

//                               {/* Designation */}
//                               <div>
//                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Designation
//                                    </label>
//                                    <input
//                                         type="text"
//                                         className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
//                                              focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         placeholder="Agent"
//                                         value={newUser.designation}
//                                         onChange={(e) => setNewUser({ ...newUser, designation: e.target.value })}
//                                    />
//                               </div>

//                               {/* Role */}
//                               <div>
//                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Role *
//                                    </label>
//                                    <select
//                                         className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
//                                              focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         value={newUser.role}
//                                         onChange={(e) => {
//                                              setNewUser({ ...newUser, role: e.target.value });
//                                              clearFieldError("role");
//                                         }} disabled={!isSuperAdmin && newUser.role !== "AGENT"}
//                                    >
//                                         <option value="AGENT">Agent</option>
//                                         {isSuperAdmin && (
//                                              <>
//                                                   <option value="PROJECT_MANAGER">Project Manager</option>
//                                                   <option value="FINANCE_HR">Finance/HR</option>
//                                                   <option value="ASS_MANAGER">Assistant Manager</option>
//                                                   <option value="ADMIN">Admin</option>
//                                              </>
//                                         )}
//                                    </select>
//                                    {formErrors.role && (
//                                         <p className="mt-1 text-xs text-red-600">{formErrors.role}</p>
//                                    )}
//                               </div>

//                               {/* Reporting Manager */}
//                               <div>
//                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Reporting Manager
//                                    </label>
//                                    <select
//                                         className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
//                                              focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         value={newUser.reportingManager}
//                                         onChange={(e) =>
//                                              setNewUser({ ...newUser, reportingManager: e.target.value })
//                                         }
//                                    >
//                                         <option value="">Select Manager</option>
//                                         {potentialManagers.map((u) => (
//                                              <option key={u.id} value={u.name}>
//                                                   {u.name}
//                                              </option>
//                                         ))}
//                                    </select>
//                               </div>

//                               {/* Salary */}
//                               {/* <div>
//                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Salary (₹)
//                                    </label>
//                                    <input
//                                         type="number"
//                                         className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
//                                              focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         placeholder="15000"
//                                         value={newUser.salary}
//                                         onChange={(e) =>
//                                              setNewUser({ ...newUser, salary: parseInt(e.target.value) || 0 })
//                                         }
//                                    />
//                               </div> */}

//                               {/* Password */}
//                               <div>
//                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Password *
//                                    </label>
//                                    <input
//                                         type="text"
//                                         className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
//                                              focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest"
//                                         placeholder="Minimum 6 characters required.."
//                                         value={newUser.password}
//                                         onChange={(e) => {
//                                              setNewUser({ ...newUser, password: e.target.value });
//                                              clearFieldError("password");
//                                         }} />
//                                    {formErrors.password && (
//                                         <p className="mt-1 text-xs text-red-600">{formErrors.password}</p>
//                                    )}
//                               </div>

//                               {/* Address */}
//                               <div className="md:col-span-2">
//                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Address
//                                    </label>
//                                    <textarea
//                                         className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
//                                              focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
//                                         placeholder="Street, City, State, ZIP"
//                                         value={newUser.address}
//                                         onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
//                                    />
//                               </div>

//                          </div>
//                     </div>

//                     <div className="p-4 border-t border-slate-200 bg-white flex justify-end gap-3">
//                          <button
//                               onClick={handleAddUser}
//                               disabled={isSubmitting}
//                               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                          >
//                               {isSubmitting ? (
//                                    <>
//                                         <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Creating...
//                                    </>
//                               ) : (
//                                    "Create User"
//                               )}
//                          </button>
//                     </div>
//                </div>
//           </div>
//      );
// };

// export default AddUserFormModal;





















import React, { useRef, useState } from "react";
import { UserPlus, X, Upload, XCircle } from "lucide-react";

const AddUserFormModal = ({
     newUser,
     setNewUser,
     handleAddUser,
     roles = [],
     designations = [],
     reportingManagers = [],
     isDropdownLoading,
     isSuperAdmin,
     handleCloseUserModal,
     isSubmitting,
     formErrors = {},
     clearFieldError,
     handleProfilePictureChange,
     handleRemoveProfilePicture,
     profilePreview
}) => {
     const fileInputRef = useRef(null);
     const [fileName, setFileName] = useState("");

     const handleFileChange = (e) => {
          const file = e.target.files[0];
          if (file) {
               setFileName(file.name);
               handleProfilePictureChange(file);
          }
     };

     const triggerFileInput = () => {
          fileInputRef.current.click();
     };

     return (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
               <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">
                    <div className="p-4 bg-blue-800 text-white flex justify-between items-center shrink-0">
                         <div>
                              <h2 className="text-lg font-bold flex items-center gap-2">
                                   <UserPlus className="w-5 h-5 text-blue-300" />
                                   Create New User
                              </h2>
                              <p className="text-blue-200 text-xs">
                                   Fill all required details to create a new user account
                              </p>
                         </div>
                         <button
                              onClick={handleCloseUserModal}
                              className="p-1 hover:bg-white/10 rounded-full transition-colors"
                         >
                              <X className="w-5 h-5 text-white" />
                         </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                              {/* Full Name */}
                              <div>
                                   <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name <span className="text-red-600">*</span>
                                   </label>
                                   <input
                                        type="text"
                                        className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="John Doe"
                                        value={newUser.name}
                                        onChange={(e) => {
                                             setNewUser({ ...newUser, name: e.target.value });
                                             clearFieldError("name");
                                        }} required
                                   />
                                   {formErrors.name && (
                                        <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>
                                   )}
                              </div>

                              {/* Email */}
                              <div>
                                   <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address <span className="text-red-600">*</span>
                                   </label>
                                   <input
                                        type="email"
                                        className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="user@company.com"
                                        value={newUser.email}
                                        onChange={(e) => {
                                             setNewUser({ ...newUser, email: e.target.value });
                                             clearFieldError("email");
                                        }} />
                                   {formErrors.email && (
                                        <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>
                                   )}
                              </div>

                              {/* Role */}
                              <div>
                                   <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Role <span className="text-red-600">*</span>
                                   </label>
                                   <select
                                        className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={newUser.role}
                                        disabled={isDropdownLoading || (!isSuperAdmin && newUser.role !== "AGENT")}
                                        onChange={(e) => {
                                             setNewUser({ ...newUser, role: e.target.value });
                                             clearFieldError("role");
                                        }}
                                   >
                                        <option value="">Select Role</option>
                                        {roles.map((r) => (
                                             <option key={r.id} value={r.value}>
                                                  {r.label}
                                             </option>
                                        ))}
                                   </select>
                                   {formErrors.role && (
                                        <p className="mt-1 text-xs text-red-600">{formErrors.role}</p>
                                   )}
                              </div>

                              {/* Phone */}
                              <div>
                                   <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number
                                   </label>

                                   <input
                                        type="tel"
                                        inputMode="numeric"
                                        maxLength={10}
                                        className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="1234567890"
                                        value={newUser.phone}
                                        onChange={(e) => {
                                             const value = e.target.value.replace(/\D/g, ""); // allow only digits

                                             if (value.length <= 10) {
                                                  setNewUser({ ...newUser, phone: value });
                                             }
                                        }}
                                   />
                              </div>

                              {/* Designation */}
                              <div>
                                   <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Designation
                                   </label>
                                   <select
                                        className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={newUser.designation}
                                        disabled={isDropdownLoading}
                                        onChange={(e) => setNewUser({ ...newUser, designation: e.target.value })}
                                   >
                                        <option value="">Select Designation</option>
                                        {designations.map((d) => (
                                             <option key={d.id} value={d.value}>
                                                  {d.label}
                                             </option>
                                        ))}
                                   </select>
                              </div>

                              {/* Reporting Manager */}
                              <div>
                                   <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Reporting Manager
                                   </label>
                                   <select
                                        className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={newUser.reportingManager}
                                        disabled={isDropdownLoading}
                                        onChange={(e) =>
                                             setNewUser({ ...newUser, reportingManager: e.target.value })
                                        }
                                   >
                                        <option value="">Select Manager</option>
                                        {reportingManagers.map((m) => (
                                             <option key={m.id} value={m.value}>
                                                  {m.label}
                                             </option>
                                        ))}
                                   </select>
                              </div>

                              {/* Password */}
                              <div>
                                   <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password <span className="text-red-600">*</span>
                                   </label>
                                   <input
                                        type="text"
                                        className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest"
                                        placeholder="Enter password.."
                                        value={newUser.password}
                                        onChange={(e) => {
                                             setNewUser({ ...newUser, password: e.target.value });
                                             clearFieldError("password");
                                        }} />
                                   {formErrors.password && (
                                        <p className="mt-1 text-xs text-red-600">{formErrors.password}</p>
                                   )}
                              </div>

                              {/* Address */}
                              <div className="md:col-span-1">
                                   <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Address
                                   </label>
                                   <textarea
                                        className="block w-full px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg 
                                             focus:outline-none focus:ring-2 focus:ring-blue-500 h-12 resize-none"
                                        placeholder="Street, City, State, ZIP"
                                        value={newUser.address}
                                        onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                                   />
                              </div>

                              {/* Profile Picture Upload */}
                              <div className="md:col-span-1">
                                   <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Profile Picture
                                   </label>
                                   <div className="flex items-center gap-4">
                                        <div className="relative">
                                             <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                                                  {profilePreview ? (
                                                       <>
                                                            <img
                                                                 src={profilePreview}
                                                                 alt="Profile preview"
                                                                 className="w-full h-full object-cover"
                                                            />
                                                            <button
                                                                 type="button"
                                                                 onClick={handleRemoveProfilePicture}
                                                                 className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                            >
                                                                 <XCircle className="w-4 h-4" />
                                                            </button>
                                                       </>
                                                  ) : (
                                                       <div className="text-center p-2">
                                                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                                                            <span className="text-xs text-gray-500">No image</span>
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                        <div className="flex-1">
                                             <input
                                                  type="file"
                                                  ref={fileInputRef}
                                                  className="hidden"
                                                  accept="image/*"
                                                  onChange={handleFileChange}
                                             />
                                             <button
                                                  type="button"
                                                  onClick={triggerFileInput}
                                                  className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded text-sm font-semibold hover:bg-blue-100 transition-colors flex items-center gap-2 mb-2"
                                             >
                                                  <Upload className="w-4 h-4" />
                                                  Upload Image
                                             </button>
                                             {fileName && (
                                                  <p className="text-xs text-gray-600 mt-1">
                                                       Selected: <span className="font-medium">{fileName}</span>
                                                  </p>
                                             )}
                                             {/* <p className="text-xs text-gray-500">
                                                  Supported formats: JPG, PNG, GIF (Max 5MB)
                                             </p> */}
                                        </div>
                                   </div>
                              </div>

                         </div>
                    </div>

                    <div className="p-4 border-t border-slate-200 bg-white flex justify-end gap-3">
                         <button
                              onClick={handleAddUser}
                              disabled={isSubmitting}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                         >
                              {isSubmitting ? (
                                   <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating...
                                   </>
                              ) : (
                                   "Create User"
                              )}
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default AddUserFormModal;