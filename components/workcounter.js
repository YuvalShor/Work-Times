import * as React from "react";
import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

export default function WorkCounter() {
  const [buttonValue, setButtonValue] = useState("Start Working");
  const [timerValue, setTimerValue] = useState(new Date(0, 0));
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimerValue(
        new Date(timerValue.setSeconds(timerValue.getSeconds() + 1))
      );
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimerValue(
        new Date(timerValue.setSeconds(timerValue.getSeconds() + 1))
      );
    }, 1000);
  };

  function changeButtonState() {
    if (buttonValue === "Start Working") {
      setButtonValue("Pause Working");

      if (!isPaused) {
        handleStart();
      } else {
        handleResume();
      }
    } else {
      setButtonValue("Start Working");

      if (isActive) {
        handlePause();
      }
    }
  }

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
          style={{ height: "20vh", marginTop: "100%" }}
        >
          <Grid item style={{ height: "2%", margin: "auto" }}>
            <Typography variant="h3" component="div">
              Hello Worker!
            </Typography>
          </Grid>

          <Grid item style={{ height: "2%", margin: "auto" }}>
            <Button
              variant="contained"
              onClick={changeButtonState}
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
}
