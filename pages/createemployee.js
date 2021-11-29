import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoginInputs from "../components/logininputs";

export default function CreateEmployee() {
  const [formInputs, setFormInputs] = useState({
    phone: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [helperText, setHelperText] = useState("e.g.: 0501234567");

  function updateFormInputs(e) {
    setFormInputs((formInputs) => ({
      ...formInputs,
      [e.target?.name]: e.target?.value,
    }));
  }

  function resetForm() {
    setFormInputs({ phone: "", password: "", firstname: "", lastname: "" });
  }

  const router = useRouter();

  function submitForm(e) {
    const re = /^[0-9\b]{10}$/;

    if (
      re.test(formInputs.phone) &&
      formInputs.password.length >= 6 &&
      formInputs.firstname &&
      formInputs.lastname
    ) {
      createEmployee();
    }
  }

  async function createEmployee() {
    try {
      const res = await fetch("http://localhost:3000/api/employees/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputs),
      });

      if (res.status === 201) {
        alert(
          "New employee " +
            formInputs.firstname +
            " " +
            formInputs.lastname +
            " has been created successfully"
        );
        router.push("/employer");
      } else {
        alert(
          "An employee already exists with the phone number " + formInputs.phone
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

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
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
