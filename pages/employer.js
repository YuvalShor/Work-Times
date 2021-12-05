import EmployeesData from "../components/employeesdata";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import WorkCounter from "../components/workcounter";
import WorkSummary from "../components/worksummary";
import Cookies from "universal-cookie";
import Typography from "@mui/material/Typography";

const cookies = new Cookies();

const Employer = () => {
  const [timerValue, setTimerValue] = useState(
    new Date(new Date().setHours(24, 0, 0, 0))
  );
  const loggedInEmployee = cookies.get("user");
  const router = useRouter();

  useEffect(() => {
    if (!loggedInEmployee) {
      console.log("Not logged in, redirecting...");
      router.push("/login");
    }
  }, []);

  const createEmployee = () => {
    router.push("/createemployee");
  };

  const logOut = () => {
    if (loggedInEmployee) {
      cookies.remove("user");
      console.log("Logging out...");
    }

    router.push("/login");
  };

  return (
    <div spacing={0} direction="column">
      <Grid
        sx={{
          "&": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Grid item style={{ minHeight: "2%", margin: "1% auto" }}>
          <Typography variant="h3" component="div" suppressHydrationWarning>
            Hello{" "}
            {loggedInEmployee != null ? loggedInEmployee["name"] : "Employee"}!
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={logOut}
            color="error"
            style={{ minHeight: "1%", margin: "2% auto" }}
          >
            Log Out
          </Button>
        </Grid>
        <Grid item>
          <WorkCounter timerValue={timerValue} setTimerValue={setTimerValue} />
          <WorkSummary timerValue={timerValue.getHours()} />
        </Grid>

        <EmployeesData />

        <Button
          variant="contained"
          onClick={createEmployee}
          color="primary"
          style={{ minHeight: "1%", margin: "2% auto" }}
        >
          Create New Employee
        </Button>
      </Grid>
    </div>
  );
};

export default Employer;
