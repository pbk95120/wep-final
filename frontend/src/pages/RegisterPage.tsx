import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import customTheme from "../styles/customTheme";
import { signup } from "../api/api";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Edu Note
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const RegisterPage = () => {
  const defaultTheme = customTheme;
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    emailRegex(email);
  };

  const emailRegex = (email: string) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    !emailRegex.test(email)
      ? setEmailError("Not a valid Email format")
      : setEmailError("");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPassword(event.target.value);
    passwordRegex(password);
  };

  const passwordRegex = (password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    !passwordRegex.test(password)
      ? setPasswordError(
          "Password must be at least 8 character, contain letters and numbers."
        )
      : setPasswordError("");
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPaassword = event.target.value;
    confirmPasswordRegex(confirmPaassword);
  };

  const confirmPasswordRegex = (confirmPassword: string) => {
    confirmPassword !== password
      ? setConfirmPasswordError("Password doesn't match")
      : setConfirmPasswordError("");
  };

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //패스워드 같은지 확인다시한번
    if (data.get("password") !== data.get("confirmPassword")) {
      setConfirmPasswordError("Password doesn't match");
    }

    //체크박스 확인
    if (!isChecked) {
      setIsAlert(true);
    }

    //값 비었는지 확인
    if (data.get("email") === "") {
      setEmailError("Not a valid Email format");
    } else if (data.get("password") === "") {
      setPasswordError(
        "Password must be at least 8 character, contain letters and numbers."
      );
    }

    //입력값 검증 후 폼 전송
    else if (
      emailError === "" &&
      passwordError === "" &&
      confirmPasswordError === "" &&
      data.get("password") === data.get("confirmPassword") &&
      isChecked === true
    ) {
      const res = await signup(
        data.get("email").toString(),
        data.get("password").toString()
      );
      if (res.status) {
        navigate("/login");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {isAlert && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">
                      You must agree to the checkbox!
                    </Alert>
                  </Stack>
                )}
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={emailError !== ""}
                  onChange={handleEmailChange}
                />
              </Grid>
              <p className="text-xs text-rose-600 ml-4">{emailError}</p>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordError !== ""}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <p className="text-xs text-rose-600 ml-4 mt-2">{passwordError}</p>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  error={confirmPasswordError !== ""}
                  onChange={handleConfirmPasswordChange}
                />
              </Grid>
              <p className="text-xs text-rose-600 ml-4 mt-2">
                {confirmPasswordError}
              </p>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox color="primary" onChange={handleCheckBox} />
                  }
                  label="I agree to be a member"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default RegisterPage;
