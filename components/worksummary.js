import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const WorkSummary = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <Grid
          container
          direction="column"
          style={{ height: "10vh", marginTop: "50%" }}
        >
          <Typography variant="h6">Total work hours this month:</Typography>
        </Grid>
      </div>
    </div>
  );
}

export default WorkSummary;