import React from "react";
import { Button, TextField, Grid } from "@mui/material";

function FormFields({ formData, handleInputChange }) {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Priority"
          name="priority"
          type="number"
          value={formData.priority}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Size"
          name="size"
          value={formData.size}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Percentage Complete"
          name="percentageComplete"
          type="number"
          value={formData.percentageComplete}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </>
  );
}

export default FormFields;
