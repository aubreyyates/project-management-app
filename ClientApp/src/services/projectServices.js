// Aliases and Absolute Imports.
import authService from "components/api-authorization/AuthorizeService";
import { PROJECTS_ENDPOINT } from "routes/api";

export const getProjects = async () => {
  const authToken = await authService.getAccessToken();
  const response = await fetch(PROJECTS_ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return await response.json();
};

export const createProject = async (projectData) => {
  const authToken = await authService.getAccessToken();
  const response = await fetch(PROJECTS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return await response.json();
};

export const updateProject = async (id, projectData) => {
  const authToken = await authService.getAccessToken();
  const response = await fetch(PROJECTS_ENDPOINT + "/" + id, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
};

export const deleteProject = async (id) => {
  const authToken = await authService.getAccessToken();
  const response = await fetch(PROJECTS_ENDPOINT + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
};
