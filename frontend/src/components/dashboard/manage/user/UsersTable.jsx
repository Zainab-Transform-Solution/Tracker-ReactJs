import React, { useState } from "react";
import {
  Trash2,
  Edit,
  Save,
  XCircle,
  Mail,
} from "lucide-react";

const UsersTable = ({
  users,
  handleDeleteUser,
  handleSendInvite,
  isSuperAdmin,
  openEditUserModal
}) => {
  const [visiblePasswordUserId, setVisiblePasswordUserId] = useState(null);

  return (
    <div className="overflow-x-auto border border-slate-200 rounded-lg">
      <div className="min-w-[768px] lg:min-w-full">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold">
            <tr>
              <th className="px-4 py-3">Emp ID</th>
              <th className="px-4 py-3">Name / Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Designation</th>
              <th className="px-4 py-3">Reporting To</th>
              <th className="px-4 py-3">Role</th>
              {isSuperAdmin && <th className="px-4 py-3">Password</th>}
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u, index) => {
              const canModifyUser = isSuperAdmin || u.role === "AGENT";

              return (
                <tr key={u.id} className="hover:bg-slate-50">

                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 font-medium text-slate-800 min-w-[180px]">
                    <div className="font-medium">{u.name}</div>
                    <div className="text-xs text-blue-600/80 mt-0.5">
                      {u.email ? (
                        u.email
                      ) : (
                        <span className="text-slate-300 italic">
                          No Email
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 font-medium text-slate-800 min-w-[180px]">
                    <div className="font-medium">{u.phone}</div>
                    <div className="text-xs text-blue-600/80 mt-0.5">
                      {u.phone ? (
                        u.phone
                      ) : (
                        <span className="text-black italic">
                          -
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-xs text-slate-600 min-w-[120px]">
                    {u.designation || "-"}
                  </td>

                  <td className="px-4 py-3 text-xs text-slate-600 min-w-[150px]">
                    {u.reportingManager || "-"}
                  </td>

                  <td className="px-4 py-3 min-w-[100px]">
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
                  </td>

                  {isSuperAdmin && (
                    <td className="px-4 py-3 text-xs min-w-[140px]">
                      <div className="flex items-center">
                        <span className="tracking-widest">
                          {visiblePasswordUserId === u.id ? u.password : "******"}
                        </span>
                        <button
                          type="button"
                          className="ml-2 text-slate-500 hover:text-slate-700"
                          onMouseDown={() => setVisiblePasswordUserId(u.id)}
                          onMouseUp={() => setVisiblePasswordUserId(null)}
                          onMouseLeave={() => setVisiblePasswordUserId(null)}
                        >
                          👁
                        </button>
                      </div>
                    </td>
                  )}

                  <td className="px-4 py-3 text-right min-w-[120px]">
                    <div className="flex items-center justify-end gap-2">
                      {canModifyUser && (
                        <>
                          {/* Edit button - opens modal */}
                          <button
                            onClick={() => openEditUserModal(u)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit User"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u)}
                            className="text-red-400 hover:text-red-600"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
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