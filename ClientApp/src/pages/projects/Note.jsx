import { Box, Grid, Typography } from "@mui/material";
import { Card } from "../../../node_modules/@mui/material/index";

function Note({ content }) {
  return (
    <Card variant="outlined">
      <Grid item xs={12}>
        <Box p={1}>
          <Typography item variant="p" color="textSecondary">
            {content}
          </Typography>
        </Box>
      </Grid>
    </Card>
  );
}

export default Note;
