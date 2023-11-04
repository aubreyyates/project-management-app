import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import View from "./View";

export default function ProjectModal({
  open,
  handleClose,
  createRow,
  updateRow,
  formType,
  rowData,
  modalStyle,
}) {
  const style = {
    ...modalStyle,
    position: "absolute",
    bgcolor: "background.paper",
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
  };
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
        ) : formType === "view" ? (
          <View rowData={rowData} />
        ) : (
          <div>Unknown form type</div>
        )}
      </Box>
    </Modal>
  );
}
