import EmployeesData from "../components/employeesdata";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";

const Employer = () => {
  const router = useRouter();
  const createEmployee = () => {
    router.push("/createemployee");
  };

  return (
    <div spacing={0} direction="column">
      <div>
        <Grid>
          <EmployeesData />
        </Grid>
        <Grid
          sx={{
            "&": {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
            "& .MuiButton-root": { width: "25ch", marginTop: "5%" },
          }}
        >
          <Button variant="contained" onClick={createEmployee} color="primary">
            Create New Employee
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default Employer;
