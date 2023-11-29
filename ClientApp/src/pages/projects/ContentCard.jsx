// Third-party library imports.
import { Box, Grid, Typography } from "@mui/material";
import { Card } from "../../../node_modules/@mui/material/index";

function ContentCard({ title, content }) {
  return (
    <Card variant="outlined">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box p={1}>
            <Typography item variant="h6">
              {title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box p={1}>
            <Typography item variant="p" color="textSecondary">
              {content}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ContentCard;
