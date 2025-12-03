import { useState } from "react";
import { TextField, Button, Snackbar, Box, Stack } from "@mui/material";



const API_BASE_URL = "https://lab15beck.onrender.com";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const showError = (msg) => {
    setError(msg);
    setOpen(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      showError("Username and password are required");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.token) {
        showError("Invalid username or password");
        return;
      }

      localStorage.setItem("token", data.token);
      onLogin(data.token);
    } catch (err) {
      showError("Login failed");
    }
  };

  const handleRegister = async () => {
    if (!username || !password) {
      showError("Username and password are required");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.error || "Registration failed");
        return;
      }

      showError("Registered successfully. You can login now.");
    } catch (err) {
      showError("Registration failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 300,
        }}
      >
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Stack direction="row" spacing={2}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#1976d2" }}
          >
            LOGIN
          </Button>

          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={handleRegister}
          >
            REGISTER
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={error || "Error"}
      />
    </Box>
  );
};

export default Login;
