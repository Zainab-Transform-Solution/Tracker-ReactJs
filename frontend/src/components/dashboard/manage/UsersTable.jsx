import React from "react";
import {
  Trash2,
  Edit,
  Save,
  XCircle,
  Mail,
} from "lucide-react";

const UsersTable = ({
  users,
  editingUserId,
  editForm,
  setEditForm,
  handleEditUser,
  handleSaveUser,
  handleCancelEdit,
  handleDeleteUser,
  handleSendInvite,
  setAssigningUser,
  potentialManagers,
  isSuperAdmin,
  canViewSalary,
}) => {
  return (
    <div className="overflow-x-auto border border-slate-200 rounded-lg">
      <div className="min-w-[768px] lg:min-w-full">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold">
            <tr>
              <th className="px-4 py-3">Emp ID</th>
              <th className="px-4 py-3">Name / Email</th>
              <th className="px-4 py-3">Designation</th>
              <th className="px-4 py-3">Reporting To</th>
              {canViewSalary && <th className="px-4 py-3">Salary</th>}
              <th className="px-4 py-3">Role</th>
              {isSuperAdmin && <th className="px-4 py-3">Password</th>}
              <th className="px-4 py-3 text-center">Tasks</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => {
              const isEditing = editingUserId === u.id;
              const canModifyUser = isSuperAdmin || u.role === "AGENT";

              return (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">
                    {isEditing ? (
                      <input
                        value={editForm.empId || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, empId: e.target.value })
                        }
                        className="w-full border rounded px-1 text-sm"
                      />
                    ) : (
                      u.empId
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800 min-w-[180px]">
                    <div className="font-medium">{u.name}</div>
                    <div className="text-xs text-slate-400 font-normal">
                      @{u.username}
                    </div>
                    <div className="text-xs text-blue-600/80 mt-0.5">
                      {isEditing ? (
                        <input
                          value={editForm.email || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              email: e.target.value,
                            })
                          }
                          className="w-full border rounded px-1 text-sm"
                          placeholder="Email"
                        />
                      ) : u.email ? (
                        u.email
                      ) : (
                        <span className="text-slate-300 italic">
                          No Email
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600 min-w-[120px]">
                    {isEditing ? (
                      <input
                        value={editForm.designation || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            designation: e.target.value,
                          })
                        }
                        className="w-full border rounded px-1 text-sm"
                      />
                    ) : (
                      u.designation
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600 min-w-[150px]">
                    {isEditing ? (
                      <select
                        value={editForm.reportingManager || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            reportingManager: e.target.value,
                          })
                        }
                        className="w-full border rounded px-1 text-sm"
                      >
                        <option value="">Select Manager</option>
                        {potentialManagers.map((m) => (
                          <option key={m.id} value={m.name}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      u.reportingManager
                    )}
                  </td>
                  {canViewSalary && (
                    <td className="px-4 py-3 text-xs font-mono text-slate-600 min-w-[80px]">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editForm.salary || 0}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              salary: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full border rounded px-1 text-sm"
                        />
                      ) : (
                        u.salary
                      )}
                    </td>
                  )}
                  <td className="px-4 py-3 min-w-[100px]">
                    {isEditing ? (
                      <select
                        value={editForm.role}
                        onChange={(e) =>
                          setEditForm({ ...editForm, role: e.target.value })
                        }
                        className="border rounded px-1 text-xs w-full"
                        disabled={!isSuperAdmin}
                      >
                        <option value="AGENT">Agent</option>
                        {isSuperAdmin && (
                          <>
                            <option value="PROJECT_MANAGER">PM</option>
                            <option value="FINANCE_HR">Fin/HR</option>
                            <option value="ADMIN">Admin</option>
                          </>
                        )}
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase whitespace-nowrap ${u.role === "ADMIN"
                            ? "bg-slate-800 text-white"
                            : u.role === "PROJECT_MANAGER"
                              ? "bg-blue-700 text-white"
                              : u.role === "FINANCE_HR"
                                ? "bg-sky-600 text-white"
                                : "bg-slate-200 text-slate-700"
                          }`}
                      >
                        {u.role.replace("_", " ")}
                      </span>
                    )}
                  </td>
                  {isSuperAdmin && (
                    <td className="px-4 py-3 text-xs min-w-[100px]">
                      {isEditing ? (
                        <input
                          type="text"
                          placeholder="New Password"
                          value={editForm.password || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              password: e.target.value,
                            })
                          }
                          className="w-full border rounded px-1 border-blue-300 focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                      ) : (
                        <span className="text-slate-400">******</span>
                      )}
                    </td>
                  )}
                  <td className="px-4 py-3 text-center min-w-[120px]">
                    {u.role === "AGENT" && (
                      <button
                        onClick={() => setAssigningUser(u)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors whitespace-nowrap"
                      >
                        <Edit className="w-3 h-3" /> Assign (
                        {u.assignedTasks?.length || 0})
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right min-w-[120px]">
                    {isEditing ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={handleSaveUser}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-red-500 hover:text-red-700"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        {!isEditing && u.email && (
                          <button
                            onClick={() => handleSendInvite(u.email)}
                            className="text-slate-400 hover:text-blue-600"
                            title="Send Portal Invite"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                        )}
                        {canModifyUser && (
                          <>
                            <button
                              onClick={() => handleEditUser(u)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="text-red-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;