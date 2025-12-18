import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

const TaskTable = ({ 
  project, 
  readOnly, 
  onAddTask, 
  onDeleteTask 
}) => {
  const [newTask, setNewTask] = useState('');
  const [newTarget, setNewTarget] = useState('');

  const handleAddTask = () => {
    onAddTask(project.id, newTask, newTarget);
    setNewTask('');
    setNewTarget('');
  };

  return (
    <div>
      <div className="mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-100">
              <th className="text-left py-2">Task Name</th>
              <th className="text-right py-2">Target / Hr</th>
              <th className="text-right py-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {project.tasks.map((t) => (
              <tr key={t.id} className="group hover:bg-slate-50">
                <td className="py-2 text-slate-700 px-2">{t.name}</td>
                <td className="py-2 text-right font-mono text-blue-600">{t.targetPerHour}</td>
                <td className="py-2 text-right px-2">
                  {!readOnly && (
                    <button
                      onClick={() => onDeleteTask(project.id, t.id)}
                      className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!readOnly && (
        <div className="flex gap-2 items-center bg-slate-50 p-2 rounded">
          <input
            className="flex-1 text-xs p-1.5 border rounded outline-none focus:border-blue-500"
            placeholder="New Task Name"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
          <input
            className="w-20 text-xs p-1.5 border rounded outline-none focus:border-blue-500 text-center"
            placeholder="Target"
            type="number"
            value={newTarget}
            onChange={e => setNewTarget(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            disabled={!newTask || !newTarget}
            className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskTable;