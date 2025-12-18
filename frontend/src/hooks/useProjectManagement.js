import { useState } from 'react';

export const useProjectManagement = (initialProjects, onUpdateProjects) => {
  const [newProject, setNewProject] = useState({
    name: '',
    monthlyHoursTarget: '',
    teamOwner: '',
    apmOwner: '',
    qaOwner: ''
  });

  const handleAddProject = () => {
    if (!newProject.name.trim()) {
      alert('Project name is required');
      return;
    }

    const project = {
      id: crypto.randomUUID(),
      name: newProject.name.trim(),
      monthlyHoursTarget: newProject.monthlyHoursTarget ? parseInt(newProject.monthlyHoursTarget) : 0,
      teamOwner: newProject.teamOwner,
      apmOwner: newProject.apmOwner,
      qaOwner: newProject.qaOwner,
      tasks: []
    };

    onUpdateProjects([...initialProjects, project]);
    resetNewProjectForm();
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Delete project?')) {
      onUpdateProjects(initialProjects.filter(p => p.id !== id));
    }
  };

  const handleUpdateProjectField = (id, field, value) => {
    const updated = initialProjects.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    );
    onUpdateProjects(updated);
  };

  const handleAddTask = (projectId, taskName, target) => {
    if (!taskName.trim() || !target) {
      alert('Task name and target are required');
      return;
    }

    const updatedProjects = initialProjects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          tasks: [
            ...p.tasks,
            {
              id: crypto.randomUUID(),
              name: taskName.trim(),
              targetPerHour: parseInt(target)
            }
          ]
        };
      }
      return p;
    });

    onUpdateProjects(updatedProjects);
  };

  const handleDeleteTask = (projectId, taskId) => {
    const updatedProjects = initialProjects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          tasks: p.tasks.filter(t => t.id !== taskId)
        };
      }
      return p;
    });

    onUpdateProjects(updatedProjects);
  };

  const resetNewProjectForm = () => {
    setNewProject({
      name: '',
      monthlyHoursTarget: '',
      teamOwner: '',
      apmOwner: '',
      qaOwner: ''
    });
  };

  const updateNewProjectField = (field, value) => {
    setNewProject(prev => ({ ...prev, [field]: value }));
  };

  return {
    newProject,
    updateNewProjectField,
    handleAddProject,
    handleDeleteProject,
    handleUpdateProjectField,
    handleAddTask,
    handleDeleteTask,
    resetNewProjectForm
  };
};