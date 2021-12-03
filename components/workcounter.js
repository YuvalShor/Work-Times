import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const WorkCounter = ({ timerValue, setTimerValue }) => {
  const [buttonValue, setButtonValue] = useState("Start Working");
  const [isActive, setIsActive] = useState(false);
  const [newSession, setNewSession] = useState(true);

  const loggedInEmployee = cookies.get("user");

  useEffect(() => {
    if (!isActive) return;
    let intervalID = setInterval(() => {
      setTimerValue(
        new Date(timerValue.setSeconds(timerValue.getSeconds() + 3600))
      );

      updateHours();
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [isActive]);

  useEffect(() => {
    if (!newSession) return;
    const updateNewSession = async () => {
      try {
        const res = await fetch("/api/employees/update", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: loggedInEmployee["phone"],
            hours: timerValue.getHours(),
            newsession: newSession,
          }),
        });

        setNewSession(false);
      } catch (error) {
        console.log(JSON.stringify(loggedInEmployee));
        console.log(error);
      }
    };
    updateNewSession();
  }, [isActive]);

  const updateHours = async () => {
    try {
      const res = await fetch("/api/employees/update", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: loggedInEmployee["phone"],
          hours: timerValue.getHours(),
        }),
      });
    } catch (error) {
      console.log(JSON.stringify(loggedInEmployee));
      console.log(error);
    }
  };

  const toggleButtonState = () => {
    setIsActive(!isActive);

    if (buttonValue === "Start Working") {
      setButtonValue("Pause Working");
    } else {
      setButtonValue("Start Working");
    }
  };

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
          style={{ height: "15vh", width: "100%" }}
        >
          <Grid item style={{ height: "2vh", margin: "auto", marginTop: "5%" }}>
            <Button
              variant="contained"
              onClick={toggleButtonState}
              color={buttonValue === "Start Working" ? "success" : "primary"}
            >
              {buttonValue}
            </Button>
          </Grid>

          <Grid item style={{ height: "2%", margin: "auto" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                disabled
                views={["hours", "minutes", "seconds"]}
                inputFormat="HH:mm:ss"
                mask="__:__:__"
                value={timerValue}
                renderInput={(params) => <TextField {...params} />}
                onChange={() => {}}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default WorkCounter;
