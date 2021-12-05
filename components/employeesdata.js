import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const EmployeesData = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setInterval(() => {
      getEmployeesData();
    }, 1000);
  }, []);

  const getEmployeesData = async () => {
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const { data: employeesRows } = await res.json();

      if (employeesRows) {
        setRows(employeesRows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Grid
          container
          direction="column"
          style={{ marginTop: "5%", display: "flex" }}
        >
          <Grid item style={{ minHeight: "2%", margin: "auto" }}>
            <Typography variant="h4">Data for all employees:</Typography>
          </Grid>

          <Grid item style={{ minHeight: "2%", margin: "auto" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Phone</TableCell>
                    <TableCell align="center">Full Name</TableCell>
                    <TableCell align="center">Monthly Hours</TableCell>
                    <TableCell align="center">Monthly Sessions</TableCell>
                    <TableCell align="center">Working Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map((row) => {
                    return (
                      <TableRow key={row.phone}>
                        <TableCell component="th" scope="row">
                          {row.phone}
                        </TableCell>
                        <TableCell align="center">
                          {row.firstname + " " + row.lastname}
                        </TableCell>
                        <TableCell align="center">{row.monthlyhours}</TableCell>
                        <TableCell align="center">
                          {row.monthlysessions}
                        </TableCell>
                        <TableCell align="center">
                          {row.workingstatus}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EmployeesData;
