import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, monthlyHours, monthlySessions, workingStatus) {
  return { name, monthlyHours, monthlySessions, workingStatus };
}

const rows = [
  createData("test1", 159, 6.0, "Working"),
  createData("test2", 237, 9.0, "Working"),
  createData("test3", 262, 16.0, "Not Working"),
  createData("test4", 305, 3.7, "Not Working"),
  createData("test5", 356, 16.0, "Not Working"),
];

export default function EmployeesData() {
  return (
    <div>
      <div>
        <Grid
          container
          direction="column"
          style={{ marginTop: "10%", display: "flex" }}
        >
          <Grid item style={{ minHeight: "2%", margin: "auto" }}>
            <Typography variant="h2">Hello Employer!</Typography>
          </Grid>

          <Grid item style={{ minHeight: "2%", margin: "auto" }}>
            <Typography variant="h4">Data for all employees:</Typography>
          </Grid>

          <Grid item style={{ minHeight: "2%", margin: "auto" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell align="center">Monthly Hours</TableCell>
                    <TableCell align="center">Monthly Sessions</TableCell>
                    <TableCell align="center">Working Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.monthlyHours}</TableCell>
                      <TableCell align="center">
                        {row.monthlySessions}
                      </TableCell>
                      <TableCell align="center">{row.workingStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
