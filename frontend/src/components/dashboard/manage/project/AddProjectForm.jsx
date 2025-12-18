import React from 'react';
import { Plus } from 'lucide-react';

const AddProjectForm = ({
  newProject,
  potentialOwners = [],
  potentialAPMs = [],
  potentialQAs = [],
  onFieldChange,
  onSubmit
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
      <div className="flex-1">
        <label className="block text-xs font-bold text-slate-500 mb-1">PROJECT NAME</label>
        <input
          type="text"
          placeholder="e.g. MoveEasy"
          value={newProject.name}
          onChange={e => onFieldChange('name', e.target.value)}
          className="w-full p-2 border rounded-lg text-sm outline-none focus:border-blue-500"
        />
      </div>
      <div className="w-full md:w-32">
        <label className="block text-xs font-bold text-slate-500 mb-1">TEAM OWNER</label>
        <select
          value={newProject.teamOwner}
          onChange={e => onFieldChange('teamOwner', e.target.value)}
          className="w-full p-2 border rounded-lg text-sm outline-none focus:border-blue-500"
        >
          <option value="">Select PM</option>
          {potentialOwners.map(u => (
            <option key={u.id} value={u.name}>{u.name}</option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-32">
        <label className="block text-xs font-bold text-slate-500 mb-1">APM</label>
        <select
          value={newProject.apmOwner}
          onChange={e => onFieldChange('apmOwner', e.target.value)}
          className="w-full p-2 border rounded-lg text-sm outline-none focus:border-blue-500"
        >
          <option value="">Select APM</option>
          {potentialAPMs.map(u => (
            <option key={u.id} value={u.name}>{u.name}</option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-32">
        <label className="block text-xs font-bold text-slate-500 mb-1">QA</label>
        <select
          value={newProject.qaOwner}
          onChange={e => onFieldChange('qaOwner', e.target.value)}
          className="w-full p-2 border rounded-lg text-sm outline-none focus:border-blue-500"
        >
          <option value="">Select QA</option>
          {potentialQAs.map(u => (
            <option key={u.id} value={u.name}>{u.name}</option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-24">
        <label className="block text-xs font-bold text-slate-500 mb-1">PROJ. HRS</label>
        <input
          type="number"
          placeholder="720"
          value={newProject.monthlyHoursTarget}
          onChange={e => onFieldChange('monthlyHoursTarget', e.target.value)}
          className="w-full p-2 border rounded-lg text-sm outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex items-end">
        <button
          onClick={onSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center justify-center gap-2 h-10"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
    </div>
  );
};

export default AddProjectForm;