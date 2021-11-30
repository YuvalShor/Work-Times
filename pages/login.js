import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginInputs from "../components/logininputs";
import AlertDialog from "../components/alertdialog";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Login = () => {
  const [formInputs, setFormInputs] = useState({ phone: "", password: "" });
  const [helperText, setHelperText] = useState("e.g.: 0501234567");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");

  const resetForm = () => {
    setFormInputs({ phone: "", password: "" });
  };

  const router = useRouter();

  const submitForm = (e) => {
    const re = /^[0-9\b]{10}$/;

    if (re.test(formInputs.phone) && formInputs.password) {
      attemptLogin();
    }
  };

  const attemptLogin = async () => {
    try {
      const res = await fetch("/api/employees/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputs),
      });

      const response = await res.json();

      if (response.success) {
        cookies.set(
          "user",
          [response.phone, response.firstname + " " + response.lastname],
          { path: "/" }
        );

        router.push("/employee");
      } else {
        setDialogText(
          "Phone number and password combination couldn't be found in the database"
        );
        handleOpenDialog();
      }
    } catch (error) {
      setDialogText(error);
      handleOpenDialog();
    }
  };

  function handleOpenDialog() {
    setDialogOpen(true);
  }

  function handleCloseDialog() {
    setDialogOpen(false);
    setDialogText("");

    if (dialogText.includes("created successfully")) {
      router.push("/employer");
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
          Work Times
        </Typography>

        <Typography variant="h4" component="div">
          Login Page
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
              Submit
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

export default Login;
