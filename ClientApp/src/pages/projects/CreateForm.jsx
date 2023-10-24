import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import FormFields from "./FormFields";

function CreateForm({ createRow }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    size: "",
    priority: "",
    percentageComplete: "",
    ownerId: "1",
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
    createRow(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Create Project</Typography>
        </Grid>
        <FormFields formData={formData} handleInputChange={handleInputChange} />
      </Grid>
    </form>
  );
}

export default CreateForm;
