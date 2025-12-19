import React from 'react';
import { Trash2 } from 'lucide-react';
import ProjectHeader from './ProjectHeader';
import TaskTable from './TaskTable';

const ProjectCard = ({
  project,
  readOnly,
  potentialOwners,
  potentialAPMs,
  potentialQAs,
  onDeleteProject,
  onUpdateTarget,
  onUpdateOwner,
  onUpdateAPM,
  onUpdateQA,
  onUpdateName,
  onAddTask,
  onDeleteTask,
  openEditModal
}) => {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <ProjectHeader
          project={project}
          readOnly={readOnly}
          potentialOwners={potentialOwners}
          potentialAPMs={potentialAPMs}
          potentialQAs={potentialQAs}
          onUpdateTarget={onUpdateTarget}
          onUpdateOwner={onUpdateOwner}
          onUpdateAPM={onUpdateAPM}
          onUpdateQA={onUpdateQA}
          onUpdateName={onUpdateName}
          openEditModal={openEditModal}
        />
        {!readOnly && (
          <button
            onClick={() => onDeleteProject(project.id)}
            className="text-red-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="p-4 bg-white">
        <TaskTable
          project={project}
          readOnly={readOnly}
          onAddTask={onAddTask}
          onDeleteTask={onDeleteTask}
        />
      </div>
    </div>
  );
};

export default ProjectCard;