// import { useState } from 'react';

// export const useProjectManagement = (initialProjects, onUpdateProjects) => {
//      const [newProject, setNewProject] = useState({
//           name: '',
//           description: '',
//           projectManagerId: '',
//           assistantManagerIds: [],
//           qaManagerIds: [],
//           teamIds: [],
//           files: [],
//      });

//      const [projectFiles, setProjectFiles] = useState([]);
//      const [formErrors, setFormErrors] = useState({});

//      const handleAddProject = () => {
//           // Validation
//           const errors = {};
//           if (!newProject.name.trim()) errors.name = 'Project name is required';
//           if (!newProject.projectManagerId) errors.projectManagerId = 'Project manager is required';


//           if (Object.keys(errors).length > 0) {
//                setFormErrors(errors);
//                return false;
//           }

//           const project = {
//                project_name: newProject.name.trim(),
//                project_description: newProject.description?.trim() || null,

//                // single select → STRING
//                project_manager_id: String(newProject.projectManagerId),

//                // multi select → ARRAY OF STRINGS
//                asst_project_manager_id: (newProject.assistantManagerIds || []).map(String),

//                qa_id: (newProject.qaManagerIds || []).map(String),

//                project_team_id: (newProject.teamIds || []).map(String),

//                // optional
//                files: projectFiles,
//           };

//           onUpdateProjects([...initialProjects, project]);
//           resetNewProjectForm();
//           setProjectFiles([]);
//           setFormErrors({});
//           return true;
//      };

//      const getManagerName = (id) => {
//           // This would come from your API data
//           return '';
//      };

//      const handleDeleteProject = (id) => {
//           if (window.confirm('Delete project?')) {
//                onUpdateProjects(initialProjects.filter(p => p.id !== id));
//           }
//      };

//      const handleUpdateProjectField = (id, field, value) => {
//           const updated = initialProjects.map(p =>
//                p.id === id ? { ...p, [field]: value } : p
//           );
//           onUpdateProjects(updated);
//      };

//      const handleAddTask = (projectId, taskName, target) => {
//           if (!taskName.trim() || !target) {
//                alert('Task name and target are required');
//                return;
//           }

//           const updatedProjects = initialProjects.map(p => {
//                if (p.id === projectId) {
//                     return {
//                          ...p,
//                          tasks: [
//                               ...p.tasks,
//                               {
//                                    id: crypto.randomUUID(),
//                                    name: taskName.trim(),
//                                    targetPerHour: parseInt(target)
//                               }
//                          ]
//                     };
//                }
//                return p;
//           });

//           onUpdateProjects(updatedProjects);
//      };

//      const handleDeleteTask = (projectId, taskId) => {
//           const updatedProjects = initialProjects.map(p => {
//                if (p.id === projectId) {
//                     return {
//                          ...p,
//                          tasks: p.tasks.filter(t => t.id !== taskId)
//                     };
//                }
//                return p;
//           });

//           onUpdateProjects(updatedProjects);
//      };

//      const resetNewProjectForm = () => {
//           setNewProject({
//                name: '',
//                description: '',
//                projectManagerId: '',
//                assistantManagerIds: [],
//                qaManagerIds: [],
//                teamIds: [],
//                files: []
//           });
//      };

//      const updateNewProjectField = (field, value) => {
//           setNewProject(prev => ({ ...prev, [field]: value }));
//           // Clear error for this field if it exists
//           if (formErrors[field]) {
//                setFormErrors(prev => ({ ...prev, [field]: '' }));
//           }
//      };

//      const clearFieldError = (field) => {
//           setFormErrors(prev => ({ ...prev, [field]: '' }));
//      };

//      const handleProjectFilesChange = (files) => {
//           console.log('Files selected:', files); // Add this
//           setProjectFiles(prev => {
//                console.log('Previous files:', prev); // Add this
//                const existingNames = prev.map(f => f.name);
//                const uniqueFiles = files.filter(f => !existingNames.includes(f.name));
//                console.log('New unique files:', uniqueFiles); // Add this
//                return [...prev, ...uniqueFiles];
//           });
//      };


//      const handleRemoveProjectFile = (index) => {
//           setProjectFiles(prev => prev.filter((_, i) => i !== index));
//      };

//      return {
//           newProject,
//           projectFiles,
//           formErrors,
//           updateNewProjectField,
//           handleAddProject,
//           handleDeleteProject,
//           handleUpdateProjectField,
//           handleAddTask,
//           handleDeleteTask,
//           resetNewProjectForm,
//           clearFieldError,
//           handleProjectFilesChange,
//           handleRemoveProjectFile
//      };
// };












// useProjectManagement.js
import { useState } from 'react';
import { createProject } from '../services/projectService';
import { fileToBase64 } from '../utils/fileToBase64'
import { toast } from "react-hot-toast";

export const useProjectManagement = (initialProjects, onUpdateProjects) => {
     const [newProject, setNewProject] = useState({
          name: '',
          description: '',
          projectManagerId: '',
          assistantManagerIds: [],
          qaManagerIds: [],
          teamIds: [],
     });

     const [projectFiles, setProjectFiles] = useState(null);
     const [formErrors, setFormErrors] = useState({});
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [submitSuccess, setSubmitSuccess] = useState(false);

     const handleAddProject = async () => {
          const errors = {};

          if (!newProject.name?.trim()) {
               errors.name = "Please enter Project name";
          }

          if (!newProject.projectManagerId) {
               errors.projectManagerId = "Please select Project manager";
          }

          if (!newProject.assistantManagerIds?.length) {
               errors.assistantManagerIds = "Please select Assistant manager(s)";
          }

          if (!newProject.qaManagerIds?.length) {
               errors.qaManagerIds = "Please select QA manager(s)";
          }

          if (!newProject.teamIds?.length) {
               errors.teamIds = "Please select Agent(s)";
          }

          if (Object.keys(errors).length > 0) {
               setFormErrors(errors);
               return false; // ⛔ STOP HERE
          }

          setIsSubmitting(true);

          try {
               let base64File = null;
               if (projectFiles) {
                    base64File = await fileToBase64(projectFiles);
               }

               const payload = {
                    project_name: newProject.name.trim(),
                    project_description: newProject.description?.trim() || null,
                    project_manager_id: Number(newProject.projectManagerId),
                    asst_project_manager_id: newProject.assistantManagerIds.map(id => Number(id)),
                    project_qa_id: newProject.qaManagerIds.map(id => Number(id)),
                    project_team_id: newProject.teamIds.map(id => Number(id)),
                    files: base64File,
               };

               const response = await createProject(payload);

               if (response?.status === 200 || response?.status === 201) {
                    resetNewProjectForm();
                    setProjectFiles(null);
                    setFormErrors({});
                    // Show success message
                    toast.success("User created successfully!", {
                         className: "toast-success toast-animate",
                         duration: 4000,
                    });
                    return true; // ✅ SUCCESS
               } else {
                    throw new Error(response.message || "Failed to create user");
               }

          } catch (err) {
               console.error("Error adding user:", err);
               toast.error(`Error creating user: ${err.message}`, {
                    className: "toast-error toast-animate",
                    duration: 4000,
               });
               return false;
          } finally {
               setIsSubmitting(false);
          }
     };

     const handleDeleteProject = async (id) => {
          if (!window.confirm('Delete project?')) return;

          try {
               // Call API to delete
               await projectService.deleteProject(id);

               // Update local state
               onUpdateProjects(initialProjects.filter(p => p.id !== id));
          } catch (error) {
               console.error('Failed to delete project:', error);
               alert('Failed to delete project. Please try again.');
          }
     };

     const handleUpdateProjectField = async (id, field, value) => {
          const projectToUpdate = initialProjects.find(p => p.id === id);
          if (!projectToUpdate) return;

          try {
               const updatePayload = {
                    [field]: value
               };

               await projectService.updateProject(id, updatePayload);

               // Update local state
               const updated = initialProjects.map(p =>
                    p.id === id ? { ...p, [field]: value } : p
               );
               onUpdateProjects(updated);
          } catch (error) {
               console.error('Failed to update project:', error);
               alert('Failed to update project. Please try again.');
          }
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
               description: '',
               projectManagerId: '',
               assistantManagerIds: [],
               qaManagerIds: [],
               teamIds: [],
          });
          setProjectFiles(null);
          setFormErrors({});
          setSubmitSuccess(false);
     };

     const updateNewProjectField = (field, value) => {
          setNewProject(prev => ({ ...prev, [field]: value }));
          // Clear error for this field if it exists
          if (formErrors[field]) {
               setFormErrors(prev => ({ ...prev, [field]: '' }));
          }
     };

     const clearFieldError = (field) => {
          setFormErrors(prev => ({ ...prev, [field]: '' }));
     };

     // const handleProjectFilesChange = (files) => {
     //      console.log('Files selected:', files);
     //      setProjectFiles(prev => {
     //           console.log('Previous files:', prev);
     //           const existingNames = prev.map(f => f.name);
     //           const uniqueFiles = files.filter(f => !existingNames.includes(f.name));
     //           console.log('New unique files:', uniqueFiles);
     //           return [...prev, ...uniqueFiles];
     //      });
     // };

     const handleProjectFilesChange = (files) => {
          // files is a single File object now
          setProjectFiles(files);
     };

     const handleRemoveProjectFile = () => {
          setProjectFiles(null);
     };

     // Add modal close handler
     const handleModalClose = () => {
          console.log("handleModalClose");
          resetNewProjectForm();
          setProjectFiles(null);
          setFormErrors({});
     };

     return {
          newProject,
          projectFiles,
          formErrors,
          isSubmitting,
          submitSuccess,
          updateNewProjectField,
          handleAddProject,
          handleDeleteProject,
          handleUpdateProjectField,
          handleAddTask,
          handleDeleteTask,
          resetNewProjectForm,
          clearFieldError,
          handleProjectFilesChange,
          handleRemoveProjectFile,
          handleModalClose
     };
};