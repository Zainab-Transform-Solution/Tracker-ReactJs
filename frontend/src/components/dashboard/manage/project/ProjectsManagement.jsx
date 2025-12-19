import React from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from "../../../../context/AuthContext";
import { useProjectManagement } from "../../../../hooks/useProjectManagement";
import AddProjectForm from './AddProjectForm';
import ProjectCard from './ProjectCard';
import { useUserDropdowns } from "../../../../hooks/useUserDropdowns";


const ProjectsManagement = ({
  projects = [],
  onUpdateProjects,
  projectManagers = [],
  assistantManagers = [],
  qaManagers = [],
  teams = []
}) => {
  const { canEditProjects, isSuperAdmin } = useAuth();

  const {
    dropdowns,
    loading: dropdownLoading,
    loadDropdowns
  } = useUserDropdowns();

  const {
    newProject,
    projectFiles,
    formErrors,
    isSubmitting,
    updateNewProjectField,
    handleAddProject,
    handleDeleteProject,
    handleUpdateProjectField,
    handleAddTask,
    handleDeleteTask,
    clearFieldError,
    handleProjectFilesChange,
    handleRemoveProjectFile,
    handleModalClose
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

  // Map the data for the old form compatibility
  const potentialOwners = projectManagers.map(pm => ({
    id: pm.id,
    name: pm.name
  }));

  const potentialAPMs = assistantManagers.map(am => ({
    id: am.id,
    name: am.name
  }));

  const potentialQAs = qaManagers.map(qa => ({
    id: qa.id,
    name: qa.name
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      <AddProjectForm
        newProject={newProject}
        onFieldChange={updateNewProjectField}
        onSubmit={handleAddProject}

        // ⬇️ dropdown data
        projectManagers={dropdowns.projectManagers}
        assistantManagers={dropdowns.assistantManagers}
        qaManagers={dropdowns.qas}
        teams={dropdowns.agents}

        loadDropdowns={loadDropdowns}
        dropdownLoading={dropdownLoading}
        isSubmitting={isSubmitting}
        formErrors={formErrors}
        clearFieldError={clearFieldError}
        projectFiles={projectFiles}
        handleProjectFilesChange={handleProjectFilesChange}
        handleRemoveProjectFile={handleRemoveProjectFile}
        handleModalClose={handleModalClose}
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