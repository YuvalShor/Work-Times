import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const WorkSummary = ({ timerValue }) => {
  const [totalMonthlyHours, setTotalMonthlyHours] = useState();
  const loggedInEmployee = cookies.get("user");

  useEffect(async () => {
    if (loggedInEmployee) {
      try {
        const res = await fetch("/api/employees", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: loggedInEmployee["phone"],
            data: "monthlyhours",
          }),
        });

        const { data: hoursFromDB } = await res.json();
        setTotalMonthlyHours(hoursFromDB);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    setTotalMonthlyHours(totalMonthlyHours + 1);
  }, [timerValue]);

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
          style={{ height: "10vh", marginTop: "10%" }}
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
