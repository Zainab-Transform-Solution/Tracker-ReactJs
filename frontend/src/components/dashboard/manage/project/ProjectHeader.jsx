import React, { useState } from 'react';
import { Briefcase, Clock, Users, Edit, Save } from 'lucide-react';

const ProjectHeader = ({
  project,
  readOnly,
  potentialOwners,
  potentialAPMs,
  potentialQAs,
  onUpdateTarget,
  onUpdateOwner,
  onUpdateAPM,
  onUpdateQA,
  onUpdateName
}) => {
  const [editingHours, setEditingHours] = useState(false);
  const [editingOwner, setEditingOwner] = useState(false);
  const [editingAPM, setEditingAPM] = useState(false);
  const [editingQA, setEditingQA] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [tempHours, setTempHours] = useState(project.monthlyHoursTarget || 0);
  const [tempOwner, setTempOwner] = useState(project.teamOwner || '');
  const [tempAPM, setTempAPM] = useState(project.apmOwner || '');
  const [tempQA, setTempQA] = useState(project.qaOwner || '');
  const [tempName, setTempName] = useState(project.name);

  const saveHours = () => {
    onUpdateTarget(project.id, parseInt(tempHours));
    setEditingHours(false);
  };

  const saveOwner = () => {
    onUpdateOwner(project.id, tempOwner);
    setEditingOwner(false);
  };

  const saveAPM = () => {
    onUpdateAPM(project.id, tempAPM);
    setEditingAPM(false);
  };

  const saveQA = () => {
    onUpdateQA(project.id, tempQA);
    setEditingQA(false);
  };

  const saveName = () => {
    onUpdateName(project.id, tempName);
    setEditingName(false);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
      <div className="flex items-center gap-2 font-bold text-slate-800">
        <Briefcase className="w-4 h-4 text-slate-500" />
        {editingName && !readOnly ? (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={tempName}
              onChange={e => setTempName(e.target.value)}
              className="p-1 border rounded text-sm"
              autoFocus
            />
            <button
              onClick={saveName}
              className="text-green-600 text-xs uppercase hover:bg-green-50 p-1 rounded"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            className={`flex items-center gap-2 group ${!readOnly ? 'cursor-pointer' : ''}`}
            onClick={() => !readOnly && setEditingName(true)}
          >
            {project.name}
            {!readOnly && (
              <Edit className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100" />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
          <Clock className="w-3 h-3" />
          <span className="font-semibold">Target:</span>
          {editingHours && !readOnly ? (
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={tempHours}
                onChange={e => setTempHours(e.target.value)}
                className="w-16 p-0.5 border rounded text-xs"
                autoFocus
              />
              <button onClick={saveHours} className="text-green-600">
                <Save className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div
              className={`flex items-center gap-2 ${!readOnly ? 'cursor-pointer' : ''}`}
              onClick={() => !readOnly && setEditingHours(true)}
            >
              <span>{project.monthlyHoursTarget || 0} Hrs</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
          <Users className="w-3 h-3" />
          <span className="font-semibold">PM:</span>
          {editingOwner && !readOnly ? (
            <div className="flex items-center gap-1">
              <select
                value={tempOwner}
                onChange={e => setTempOwner(e.target.value)}
                className="w-24 p-0.5 border rounded text-xs"
                autoFocus
              >
                <option value="">-</option>
                {potentialOwners.map(u => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
              <button onClick={saveOwner} className="text-green-600">
                <Save className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div
              className={`flex items-center gap-2 ${!readOnly ? 'cursor-pointer' : ''}`}
              onClick={() => !readOnly && setEditingOwner(true)}
            >
              <span>{project.teamOwner || '-'}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
          <Users className="w-3 h-3" />
          <span className="font-semibold">APM:</span>
          {editingAPM && !readOnly ? (
            <div className="flex items-center gap-1">
              <select
                value={tempAPM}
                onChange={e => setTempAPM(e.target.value)}
                className="w-24 p-0.5 border rounded text-xs"
                autoFocus
              >
                <option value="">-</option>
                {potentialAPMs.map(u => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
              <button onClick={saveAPM} className="text-green-600">
                <Save className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div
              className={`flex items-center gap-2 ${!readOnly ? 'cursor-pointer' : ''}`}
              onClick={() => !readOnly && setEditingAPM(true)}
            >
              <span>{project.apmOwner || '-'}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
          <Users className="w-3 h-3" />
          <span className="font-semibold">QA:</span>
          {editingQA && !readOnly ? (
            <div className="flex items-center gap-1">
              <select
                value={tempQA}
                onChange={e => setTempQA(e.target.value)}
                className="w-24 p-0.5 border rounded text-xs"
                autoFocus
              >
                <option value="">-</option>
                {potentialQAs.map(u => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
              <button onClick={saveQA} className="text-green-600">
                <Save className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div
              className={`flex items-center gap-2 ${!readOnly ? 'cursor-pointer' : ''}`}
              onClick={() => !readOnly && setEditingQA(true)}
            >
              <span>{project.qaOwner || '-'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;