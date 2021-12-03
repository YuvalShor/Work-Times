import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import WorkCounter from "../components/workcounter";
import WorkSummary from "../components/worksummary";
import Cookies from "universal-cookie";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const cookies = new Cookies();

const Employee = () => {
  const loggedInEmployee = cookies.get("user");
  const router = useRouter();

  useEffect(() => {
    if (!loggedInEmployee) {
      console.log("Not logged in, redirecting...");
      router.push("/login");
    }
  }, []);

  const [timerValue, setTimerValue] = useState(
    new Date(new Date().setHours(24, 0, 0, 0))
  );

  return (
    <div>
      <Grid
        sx={{
          "&": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Grid item style={{ minHeight: "2%", margin: "5% auto" }}>
          <Typography variant="h3" component="div" suppressHydrationWarning>
            Hello{" "}
            {loggedInEmployee != null ? loggedInEmployee["name"] : "Employee"}!
          </Typography>
        </Grid>
        <WorkCounter timerValue={timerValue} setTimerValue={setTimerValue} />
        <WorkSummary timerValue={timerValue.getHours()} />
      </Grid>
    </div>
  );
};

export default Employee;
