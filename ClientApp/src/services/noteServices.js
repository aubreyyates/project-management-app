// Aliases and Absolute Imports.
import authService from "components/api-authorization/AuthorizeService";
import { NOTES_ENDPOINT } from "routes/api";

export const getNotes = async (projectId) => {
  const authToken = await authService.getAccessToken();
  const response = await fetch(NOTES_ENDPOINT + "/" + projectId + "/notes", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json", // Specify the content type
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return await response.json();
};

export const createNote = async (noteData, projectId) => {
  const authToken = await authService.getAccessToken();
  const response = await fetch(NOTES_ENDPOINT + "/" + projectId + "/notes", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: noteData.content,
    }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return await response.json();
};

export const updateNote = async (id, noteData, projectId) => {
  const authToken = await authService.getAccessToken();
  const response = await fetch(
    NOTES_ENDPOINT + "/" + projectId + "/notes/" + id,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: noteData.content,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
};

export const deleteNote = async (id, projectId) => {
  const authToken = await authService.getAccessToken();
  const response = await fetch(
    NOTES_ENDPOINT + "/" + projectId + "/notes/" + id,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
};
