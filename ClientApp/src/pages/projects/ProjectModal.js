import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CreateForm from "./CreateForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

export default function ProjectModal({
  open,
  handleOpen,
  handleClose,
  updateTableData,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CreateForm
          handleClose={handleClose}
          updateTableData={updateTableData}
        />
      </Box>
    </Modal>
  );
}