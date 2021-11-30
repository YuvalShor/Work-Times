import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const WorkSummary = ({ currentSessionTime }) => {
  const [totalMonthlyHours, setTotalMonthlyHours] = useState(0);
  const loggedInEmployee = cookies.get("user");

  useEffect(async () => {
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: loggedInEmployee.phone,
          data: "monthlyhours",
        }),
      });

      console.log(currentSessionTime);

      const { data: hoursFromDB } = await res.json();
      console.log(hoursFromDB);
      setTotalMonthlyHours(
        parseInt(hoursFromDB) + parseInt(currentSessionTime)
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

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
          <Typography variant="h6">
            Total work hours this month: {totalMonthlyHours}
          </Typography>
        </Grid>
      </div>
    </div>
  );
};

export default WorkSummary;
