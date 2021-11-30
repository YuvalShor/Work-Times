import * as React from "react";
import TextField from "@mui/material/TextField";

const LoginInputs = ({
  helperText,
  setHelperText,
  formInputs,
  setFormInputs,
}) => {
  const re = /^[0-9\b]{0,10}$/;

  const updateFormInputs = (e) => {
    if (e.target?.name === "phone") {
      if (re.test(e.target?.value)) {
        setFormInputs((formInputs) => ({
          ...formInputs,
          [e.target?.name]: e.target?.value,
        }));
        changeHelperText(true);
      } else {
        changeHelperText(false);
      }
    } else {
      setFormInputs((formInputs) => ({
        ...formInputs,
        [e.target?.name]: e.target?.value,
      }));
    }
  };

  const changeHelperText = (valid) => {
    if (!valid) {
      setHelperText("Only use digits, can't exceed 10 digits");
      setTimeout(() => {
        setHelperText("e.g.: 0501234567");
      }, 3000);
    } else {
      setHelperText("e.g.: 0501234567");
    }
  };

  return (
    <div>
      <TextField
        required
        label="Phone Number"
        placeholder="Phone Number"
        helperText={helperText}
        name="phone"
        inputProps={{ inputMode: "numeric" }}
        onChange={updateFormInputs}
        value={formInputs.phone}
      />
      <TextField
        required
        label="Password"
        type="password"
        placeholder="Password"
        helperText="minimum 6 characters"
        name="password"
        onChange={updateFormInputs}
        value={formInputs.password}
      />
    </div>
  );
};

export default LoginInputs;
