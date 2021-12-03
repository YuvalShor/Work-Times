import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoginInputs from "../components/logininputs";
import AlertDialog from "../components/alertdialog";
import Cookies from "universal-cookie";
import {
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";

const cookies = new Cookies();

const CreateEmployee = () => {
  const loggedInEmployee = cookies.get("user");

  useEffect(() => {
    if (!loggedInEmployee) {
      console.log("Not logged in, redirecting...");
      router.push("/login");
    }
  }, []);
  
  const [formInputs, setFormInputs] = useState({
    type: "employee",
    phone: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [helperText, setHelperText] = useState("e.g.: 0501234567");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const router = useRouter();

  const updateFormInputs = (e) => {
    setFormInputs((formInputs) => ({
      ...formInputs,
      [e.target?.name]: e.target?.value,
    }));
  };

  const resetForm = () => {
    setFormInputs({
      type: "Employee",
      phone: "",
      password: "",
      firstname: "",
      lastname: "",
    });
  };

  const submitForm = (e) => {
    const re = /^[0-9\b]{10}$/;

    if (
      re.test(formInputs.phone) &&
      formInputs.password.length >= 6 &&
      formInputs.firstname &&
      formInputs.lastname
    ) {
      createEmployee();
    }
  };

  const createEmployee = async () => {
    try {
      const res = await fetch("/api/employees/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputs),
      });

      if (res.status === 201) {
        setDialogText(
          "New " +
            formInputs.type +
            " " +
            formInputs.firstname +
            " " +
            formInputs.lastname +
            " has been created successfully"
        );
        handleOpenDialog();
      } else {
        setDialogText(
          "An employee already exists with the phone number " + formInputs.phone
        );
        handleOpenDialog();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogText("");

    if (dialogText.includes("created successfully")) {
      router.push("/employer");
    }
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Typography variant="h3" component="div">
          Create a New Employee
        </Typography>

        <Grid
          item
          xs={3}
          component="form"
          sx={{
            "&": {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
            "& .MuiTextField-root": {
              display: "flex",
              flexDirection: "column",
              m: 1,
              width: "30ch",
            },
            "& .MuiButton-root": { m: 1, width: "15ch" },
          }}
          autoComplete="off"
        >
          <RadioGroup
            row
            aria-label="Type"
            defaultValue="employee"
            name="type"
            onChange={updateFormInputs}
          >
            <FormControlLabel
              value="employee"
              control={<Radio />}
              label="Employee"
            />
            <FormControlLabel
              value="employer"
              control={<Radio />}
              label="Employer"
            />
          </RadioGroup>
          <LoginInputs
            helperText={helperText}
            setHelperText={setHelperText}
            formInputs={formInputs}
            setFormInputs={setFormInputs}
          />
          <div>
            <TextField
              required
              label="First Name"
              type="text"
              placeholder="First Name"
              name="firstname"
              onChange={updateFormInputs}
              value={formInputs.firstname}
            />
            <TextField
              required
              label="Last Name"
              type="text"
              placeholder="Last Name"
              name="lastname"
              onChange={updateFormInputs}
              value={formInputs.lastname}
            />
          </div>
          <div
            sx={{
              "&": {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              },
            }}
          >
            <Button variant="contained" onClick={submitForm} color="primary">
              Create
            </Button>
            <Button variant="contained" onClick={resetForm} color="error">
              Reset
            </Button>
            <AlertDialog
              dialogOpen={dialogOpen}
              dialogText={dialogText}
              handleCloseDialog={handleCloseDialog}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateEmployee;
