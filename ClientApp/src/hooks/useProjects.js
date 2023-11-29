import { useState, useEffect } from "react";
import {
  getProjects as getProjectsService,
  createProject as createProjectService,
  updateProject as updateProjectService,
  deleteProject as deleteProjectService,
} from "services/projectServices";

const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const projects = await getProjectsService();
      setProjects(projects);
    };

    fetchData();
  }, []);

  const createProject = async (newProjectData) => {
    const newProject = await createProjectService(newProjectData);
    setProjects([...projects, newProject]);
  };

  const updateProject = async (projectId, updatedData) => {
    await updateProjectService(projectId, updatedData);
    let updatedProject = {
      ...updatedData,
      projectId: projectId,
    };
    setProjects(
      projects.map((project) =>
        project.id === projectId ? updatedProject : project
      )
    );
  };

  const deleteProject = async (projectId) => {
    await deleteProjectService(projectId);
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  return [projects, createProject, updateProject, deleteProject];
};

export default useProjects;
