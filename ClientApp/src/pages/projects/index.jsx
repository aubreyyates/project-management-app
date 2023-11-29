// Third-party library imports.
import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// Relative imports of components/functions.
import Table from "./Table";
import ProjectModal from "./ProjectModal";

// Import styles.
import { smallModalSize } from "components/modal/modalSizes";

// Absolute imports.
import useProjects from "hooks/useProjects";

export default function Projects() {
  const [projects, createProject, updateProject, deleteProject] = useProjects();
  const [modalType, setModalType] = useState(null);
  const [project, setProject] = useState({});
  const [modalStyle, setModalStyle] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateNewProjectButtonClick = (modalType, modalStyle) => {
    openModal(modalType, modalStyle);
  };

  const openModal = (modalType, modalStyle, project = {}) => {
    setModalType(modalType);
    setModalStyle(modalStyle);
    setProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Grid
        container
        rowSpacing={4.5}
        columnSpacing={2.75}
        justifyContent="space-between"
      >
        <Grid item sm={6} md={10} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Projects</Typography>
        </Grid>
        <Grid item sm={6} md={2} xsOffset="auto">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="medium"
            sx={{ width: "100%" }}
            onClick={() =>
              handleCreateNewProjectButtonClick(
                "createProjectForm",
                smallModalSize
              )
            }
          >
            Create New Project
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Table
            projects={projects}
            openModal={openModal}
            deleteProject={deleteProject}
          />
        </Grid>
      </Grid>
      <ProjectModal
        closeModal={closeModal}
        modalType={modalType}
        modalStyle={modalStyle}
        isModalOpen={isModalOpen}
        project={project}
        createProject={createProject}
        updateProject={updateProject}
      />
    </>
  );
}
