// Third-party library imports.
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// Relative imports of components/functions.
import CreateForm from "./forms/CreateForm";
import UpdateForm from "./forms/UpdateForm";
import View from "./View";

export default function ProjectModal({
  isModalOpen,
  closeModal,
  modalType,
  modalStyle,
  project,
  createProject,
  updateProject,
}) {
  const style = {
    ...modalStyle,
    position: "absolute",
    bgcolor: "background.paper",
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
  };

  const handleModalOnClose = () => {
    closeModal();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalOnClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {modalType === "createProjectForm" ? (
          <CreateForm closeModal={closeModal} createProject={createProject} />
        ) : modalType === "updateProjectForm" ? (
          <UpdateForm
            closeModal={closeModal}
            updateProject={updateProject}
            project={project}
          />
        ) : modalType === "viewProject" ? (
          <View project={project} />
        ) : (
          <div>Unknown form type</div>
        )}
      </Box>
    </Modal>
  );
}
