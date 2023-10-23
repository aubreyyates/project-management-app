import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";

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
  handleClose,
  createRow,
  updateRow,
  formType,
  rowData,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {formType === "create" ? (
          <CreateForm createRow={createRow} />
        ) : formType === "update" ? (
          <UpdateForm updateRow={updateRow} rowData={rowData} />
        ) : (
          <div>Unknown form type</div>
        )}
      </Box>
    </Modal>
  );
}
