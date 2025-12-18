// import React, { useState } from 'react';
// import { Trash2, Plus, Briefcase, Clock, Users, Edit, Save, Lock } from 'lucide-react';
// import { useAuth } from "../../../../context/AuthContext";

// const ProjectsManagement = ({
//   projects = [],
//   onUpdateProjects,
//   potentialOwners = [],
//   potentialAPMs = [],
//   potentialQAs = []
// }) => {
//   const { canEditProjects, isSuperAdmin } = useAuth();
//   const [newProjectName, setNewProjectName] = useState('');
//   const [newProjectHours, setNewProjectHours] = useState('');
//   const [newProjectOwner, setNewProjectOwner] = useState('');
//   const [newProjectAPM, setNewProjectAPM] = useState('');
//   const [newProjectQA, setNewProjectQA] = useState('');

//   // Only show if user has permission to edit projects
//   if (!canEditProjects && !isSuperAdmin) {
//     return (
//       <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-yellow-800 flex items-center gap-3">
//         <Lock className="w-5 h-5" />
//         <div>
//           <h3 className="font-bold">Access Denied</h3>
//           <p className="text-sm">You don't have permission to manage projects.</p>
//         </div>
//       </div>
//     );
//   }

//   const handleAddProject = () => {
//     if (!newProjectName.trim()) {
//       alert('Project name is required');
//       return;
//     }

//     const project = {
//       id: crypto.randomUUID(),
//       name: newProjectName.trim(),
//       monthlyHoursTarget: newProjectHours ? parseInt(newProjectHours) : 0,
//       teamOwner: newProjectOwner,
//       apmOwner: newProjectAPM,
//       qaOwner: newProjectQA,
//       tasks: []
//     };

//     onUpdateProjects([...projects, project]);

//     // Reset form
//     setNewProjectName('');
//     setNewProjectHours('');
//     setNewProjectOwner('');
//     setNewProjectAPM('');
//     setNewProjectQA('');
//   };

//   const handleDeleteProject = (id) => {
//     if (window.confirm('Delete project?')) {
//       onUpdateProjects(projects.filter(p => p.id !== id));
//     }
//   };

//   const handleUpdateProjectField = (id, field, value) => {
//     const updated = projects.map(p =>
//       p.id === id ? { ...p, [field]: value } : p
//     );
//     onUpdateProjects(updated);
//   };

//   const handleAddTask = (projectId, taskName, target) => {
//     if (!taskName.trim() || !target) {
//       alert('Task name and target are required');
//       return;
//     }

//     const updatedProjects = projects.map(p => {
//       if (p.id === projectId) {
//         return {
//           ...p,
//           tasks: [
//             ...p.tasks,
//             {
//               id: crypto.randomUUID(),
//               name: taskName.trim(),
//               targetPerHour: parseInt(target)
//             }
//           ]
//         };
//       }
//       return p;
//     });

//     onUpdateProjects(updatedProjects);
//   };

//   const handleDeleteTask = (projectId, taskId) => {
//     const updatedProjects = projects.map(p => {
//       if (p.id === projectId) {
//         return {
//           ...p,
//           tasks: p.tasks.filter(t => t.id !== taskId)
//         };
//       }
//       return p;
//     });

//     onUpdateProjects(updatedProjects);
//   };

//   return (
//     <div className="space-y-8 animate-fade-in">
//       {/* Add Project Form */}
//       <div className="flex flex-col md:flex-row gap-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
//         <div className="flex-1">
//           <label className="block text-xs font-bold text-slate-500 mb-1">PROJECT NAME</label>
//           <input
//             type="text"
//             placeholder="e.g. MoveEasy"
//             value={newProjectName}
//             onChange={e => setNewProjectName(e.target.value)}
//             className="w-full p-2 border rounded-lg text-sm outline-none focus:border-blue-500"
//           />
//         </div>
//         <div className="w-full md:w-32">
//           <label className="block text-xs font-bold text-slate-500 mb-1">TEAM OWNER</label>
//           <select
//             value={newProjectOwner}
//             onChange={e => setNewProjectOwner(e.target.value)}
//             className="w-full p-2 border rounded-lg text-sm outline-none focus:border-blue-500"
//           >
//             <option value="">Select PM</option>
//             {potentialOwners.map(u => (
//               <option key={u.id} value={u.name}>{u.name}</option>
//             ))}
//           </select>
//         </div>
//         <div className="w-full md:w-32">
//           <label className="block text-xs font-bold text-slate-500 mb-1">APM</label>
//           <select
//             value={newProjectAPM}
//             onChange={e => setNewProjectAPM(e.target.value)}
//             className="w-full p-2 border rounded-lg text-sm outline-none focus:border-blue-500"
//           >
//             <option value="">Select APM</option>
//             {potentialAPMs.map(u => (
//               <option key={u.id} value={u.name}>{u.name}</option>
//             ))}
//           </select>
//         </div>
//         <div className="w-full md:w-32">
//           <label className="block text-xs font-bold text-slate-500 mb-1">QA</label>
//           <select
//             value={newProjectQA}
//             onChange={e => setNewProjectQA(e.target.value)}
//             className="w-full p-2 border rounded-lg text-sm outline-none focus:border-blue-500"
//           >
//             <option value="">Select QA</option>
//             {potentialQAs.map(u => (
//               <option key={u.id} value={u.name}>{u.name}</option>
//             ))}
//           </select>
//         </div>
//         <div className="w-full md:w-24">
//           <label className="block text-xs font-bold text-slate-500 mb-1">PROJ. HRS</label>
//           <input
//             type="number"
//             placeholder="720"
//             value={newProjectHours}
//             onChange={e => setNewProjectHours(e.target.value)}
//             className="w-full p-2 border rounded-lg text-sm outline-none focus:border-blue-500"
//           />
//         </div>
//         <div className="flex items-end">
//           <button
//             onClick={handleAddProject}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center justify-center gap-2 h-10"
//           >
//             <Plus className="w-4 h-4" /> Add
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-6">
//         {projects.map(proj => (
//           <ProjectCard
//             key={proj.id}
//             project={proj}
//             readOnly={!canEditProjects}
//             potentialOwners={potentialOwners}
//             potentialAPMs={potentialAPMs}
//             potentialQAs={potentialQAs}
//             onDeleteProject={handleDeleteProject}
//             onUpdateTarget={(id, v) => handleUpdateProjectField(id, 'monthlyHoursTarget', v)}
//             onUpdateOwner={(id, v) => handleUpdateProjectField(id, 'teamOwner', v)}
//             onUpdateAPM={(id, v) => handleUpdateProjectField(id, 'apmOwner', v)}
//             onUpdateQA={(id, v) => handleUpdateProjectField(id, 'qaOwner', v)}
//             onUpdateName={(id, v) => handleUpdateProjectField(id, 'name', v)}
//             onAddTask={handleAddTask}
//             onDeleteTask={handleDeleteTask}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const ProjectCard = ({
//   project,
//   readOnly,
//   potentialOwners,
//   potentialAPMs,
//   potentialQAs,
//   onDeleteProject,
//   onUpdateTarget,
//   onUpdateOwner,
//   onUpdateAPM,
//   onUpdateQA,
//   onUpdateName,
//   onAddTask,
//   onDeleteTask
// }) => {
//   const [newTask, setNewTask] = useState('');
//   const [newTarget, setNewTarget] = useState('');
//   const [editingHours, setEditingHours] = useState(false);
//   const [editingOwner, setEditingOwner] = useState(false);
//   const [editingAPM, setEditingAPM] = useState(false);
//   const [editingQA, setEditingQA] = useState(false);
//   const [editingName, setEditingName] = useState(false);
//   const [tempHours, setTempHours] = useState(project.monthlyHoursTarget || 0);
//   const [tempOwner, setTempOwner] = useState(project.teamOwner || '');
//   const [tempAPM, setTempAPM] = useState(project.apmOwner || '');
//   const [tempQA, setTempQA] = useState(project.qaOwner || '');
//   const [tempName, setTempName] = useState(project.name);

//   const saveHours = () => {
//     onUpdateTarget(project.id, parseInt(tempHours));
//     setEditingHours(false);
//   };

//   const saveOwner = () => {
//     onUpdateOwner(project.id, tempOwner);
//     setEditingOwner(false);
//   };

//   const saveAPM = () => {
//     onUpdateAPM(project.id, tempAPM);
//     setEditingAPM(false);
//   };

//   const saveQA = () => {
//     onUpdateQA(project.id, tempQA);
//     setEditingQA(false);
//   };

//   const saveName = () => {
//     onUpdateName(project.id, tempName);
//     setEditingName(false);
//   };

//   const addTask = () => {
//     onAddTask(project.id, newTask, newTarget);
//     setNewTask('');
//     setNewTarget('');
//   };

//   return (
//     <div className="border border-slate-200 rounded-lg overflow-hidden">
//       <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
//         <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
//           <div className="flex items-center gap-2 font-bold text-slate-800">
//             <Briefcase className="w-4 h-4 text-slate-500" />
//             {editingName && !readOnly ? (
//               <div className="flex items-center gap-1">
//                 <input
//                   type="text"
//                   value={tempName}
//                   onChange={e => setTempName(e.target.value)}
//                   className="p-1 border rounded text-sm"
//                   autoFocus
//                 />
//                 <button
//                   onClick={saveName}
//                   className="text-green-600 text-xs uppercase hover:bg-green-50 p-1 rounded"
//                 >
//                   <Save className="w-4 h-4" />
//                 </button>
//               </div>
//             ) : (
//               <div
//                 className={`flex items-center gap-2 group ${!readOnly ? 'cursor-pointer' : ''}`}
//                 onClick={() => !readOnly && setEditingName(true)}
//               >
//                 {project.name}
//                 {!readOnly && (
//                   <Edit className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100" />
//                 )}
//               </div>
//             )}
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
//               <Clock className="w-3 h-3" />
//               <span className="font-semibold">Target:</span>
//               {editingHours && !readOnly ? (
//                 <div className="flex items-center gap-1">
//                   <input
//                     type="number"
//                     value={tempHours}
//                     onChange={e => setTempHours(e.target.value)}
//                     className="w-16 p-0.5 border rounded text-xs"
//                     autoFocus
//                   />
//                   <button onClick={saveHours} className="text-green-600">
//                     <Save className="w-3 h-3" />
//                   </button>
//                 </div>
//               ) : (
//                 <div
//                   className={`flex items-center gap-2 ${!readOnly ? 'cursor-pointer' : ''}`}
//                   onClick={() => !readOnly && setEditingHours(true)}
//                 >
//                   <span>{project.monthlyHoursTarget || 0} Hrs</span>
//                 </div>
//               )}
//             </div>
//             <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
//               <Users className="w-3 h-3" />
//               <span className="font-semibold">PM:</span>
//               {editingOwner && !readOnly ? (
//                 <div className="flex items-center gap-1">
//                   <select
//                     value={tempOwner}
//                     onChange={e => setTempOwner(e.target.value)}
//                     className="w-24 p-0.5 border rounded text-xs"
//                     autoFocus
//                   >
//                     <option value="">-</option>
//                     {potentialOwners.map(u => (
//                       <option key={u.id} value={u.name}>{u.name}</option>
//                     ))}
//                   </select>
//                   <button onClick={saveOwner} className="text-green-600">
//                     <Save className="w-3 h-3" />
//                   </button>
//                 </div>
//               ) : (
//                 <div
//                   className={`flex items-center gap-2 ${!readOnly ? 'cursor-pointer' : ''}`}
//                   onClick={() => !readOnly && setEditingOwner(true)}
//                 >
//                   <span>{project.teamOwner || '-'}</span>
//                 </div>
//               )}
//             </div>
//             <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
//               <Users className="w-3 h-3" />
//               <span className="font-semibold">APM:</span>
//               {editingAPM && !readOnly ? (
//                 <div className="flex items-center gap-1">
//                   <select
//                     value={tempAPM}
//                     onChange={e => setTempAPM(e.target.value)}
//                     className="w-24 p-0.5 border rounded text-xs"
//                     autoFocus
//                   >
//                     <option value="">-</option>
//                     {potentialAPMs.map(u => (
//                       <option key={u.id} value={u.name}>{u.name}</option>
//                     ))}
//                   </select>
//                   <button onClick={saveAPM} className="text-green-600">
//                     <Save className="w-3 h-3" />
//                   </button>
//                 </div>
//               ) : (
//                 <div
//                   className={`flex items-center gap-2 ${!readOnly ? 'cursor-pointer' : ''}`}
//                   onClick={() => !readOnly && setEditingAPM(true)}
//                 >
//                   <span>{project.apmOwner || '-'}</span>
//                 </div>
//               )}
//             </div>
//             <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
//               <Users className="w-3 h-3" />
//               <span className="font-semibold">QA:</span>
//               {editingQA && !readOnly ? (
//                 <div className="flex items-center gap-1">
//                   <select
//                     value={tempQA}
//                     onChange={e => setTempQA(e.target.value)}
//                     className="w-24 p-0.5 border rounded text-xs"
//                     autoFocus
//                   >
//                     <option value="">-</option>
//                     {potentialQAs.map(u => (
//                       <option key={u.id} value={u.name}>{u.name}</option>
//                     ))}
//                   </select>
//                   <button onClick={saveQA} className="text-green-600">
//                     <Save className="w-3 h-3" />
//                   </button>
//                 </div>
//               ) : (
//                 <div
//                   className={`flex items-center gap-2 ${!readOnly ? 'cursor-pointer' : ''}`}
//                   onClick={() => !readOnly && setEditingQA(true)}
//                 >
//                   <span>{project.qaOwner || '-'}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         {!readOnly && (
//           <button
//             onClick={() => onDeleteProject(project.id)}
//             className="text-red-400 hover:text-red-600"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         )}
//       </div>

//       {/* Task Table */}
//       <div className="p-4 bg-white">
//         <div className="mb-4">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-xs text-slate-500 border-b border-slate-100">
//                 <th className="text-left py-2">Task Name</th>
//                 <th className="text-right py-2">Target / Hr</th>
//                 <th className="text-right py-2 w-10"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {project.tasks.map((t) => (
//                 <tr key={t.id} className="group hover:bg-slate-50">
//                   <td className="py-2 text-slate-700 px-2">{t.name}</td>
//                   <td className="py-2 text-right font-mono text-blue-600">{t.targetPerHour}</td>
//                   <td className="py-2 text-right px-2">
//                     {!readOnly && (
//                       <button
//                         onClick={() => onDeleteTask(project.id, t.id)}
//                         className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <Trash2 className="w-3 h-3" />
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {!readOnly && (
//           <div className="flex gap-2 items-center bg-slate-50 p-2 rounded">
//             <input
//               className="flex-1 text-xs p-1.5 border rounded outline-none focus:border-blue-500"
//               placeholder="New Task Name"
//               value={newTask}
//               onChange={e => setNewTask(e.target.value)}
//             />
//             <input
//               className="w-20 text-xs p-1.5 border rounded outline-none focus:border-blue-500 text-center"
//               placeholder="Target"
//               type="number"
//               value={newTarget}
//               onChange={e => setNewTarget(e.target.value)}
//             />
//             <button
//               onClick={addTask}
//               disabled={!newTask || !newTarget}
//               className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
//             >
//               <Plus className="w-4 h-4" />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectsManagement;














import React from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from "../../../../context/AuthContext";
import { useProjectManagement } from "../../../../hooks/useProjectManagement";
import AddProjectForm from './AddProjectForm';
import ProjectCard from './ProjectCard';

const ProjectsManagement = ({
  projects = [],
  onUpdateProjects,
  potentialOwners = [],
  potentialAPMs = [],
  potentialQAs = []
}) => {
  const { canEditProjects, isSuperAdmin } = useAuth();
  
  const {
    newProject,
    updateNewProjectField,
    handleAddProject,
    handleDeleteProject,
    handleUpdateProjectField,
    handleAddTask,
    handleDeleteTask
  } = useProjectManagement(projects, onUpdateProjects);

  // Only show if user has permission to edit projects
  if (!canEditProjects && !isSuperAdmin) {
    return (
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-yellow-800 flex items-center gap-3">
        <Lock className="w-5 h-5" />
        <div>
          <h3 className="font-bold">Access Denied</h3>
          <p className="text-sm">You don't have permission to manage projects.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <AddProjectForm
        newProject={newProject}
        potentialOwners={potentialOwners}
        potentialAPMs={potentialAPMs}
        potentialQAs={potentialQAs}
        onFieldChange={updateNewProjectField}
        onSubmit={handleAddProject}
      />

      <div className="grid grid-cols-1 gap-6">
        {projects.map(proj => (
          <ProjectCard
            key={proj.id}
            project={proj}
            readOnly={!canEditProjects}
            potentialOwners={potentialOwners}
            potentialAPMs={potentialAPMs}
            potentialQAs={potentialQAs}
            onDeleteProject={handleDeleteProject}
            onUpdateTarget={(id, v) => handleUpdateProjectField(id, 'monthlyHoursTarget', v)}
            onUpdateOwner={(id, v) => handleUpdateProjectField(id, 'teamOwner', v)}
            onUpdateAPM={(id, v) => handleUpdateProjectField(id, 'apmOwner', v)}
            onUpdateQA={(id, v) => handleUpdateProjectField(id, 'qaOwner', v)}
            onUpdateName={(id, v) => handleUpdateProjectField(id, 'name', v)}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsManagement;