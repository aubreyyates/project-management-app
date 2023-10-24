import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import FormFields from "./FormFields";

function UpdateForm({ updateRow, rowData }) {
  const [formData, setFormData] = useState({
    name: rowData.name,
    description: rowData.description,
    size: rowData.size,
    priority: rowData.priority,
    percentageComplete: rowData.percentageComplete,
    userId: rowData.userId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { id: rowData.id, ...formData };
    updateRow(rowData.id, data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Edit Project</Typography>
        </Grid>
        <FormFields formData={formData} handleInputChange={handleInputChange} />
      </Grid>
    </form>
  );
}

export default UpdateForm;
