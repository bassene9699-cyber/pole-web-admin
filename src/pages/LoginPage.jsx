import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const LoginPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      await loginUser(email, password);

      navigate("/");   // correction ici

    } catch (error) {

      alert("Login failed");

    }

  };

  return (

    <Box
      sx={{
        width: 400,
        margin: "100px auto",
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
    >

      <Typography variant="h4">
        Admin Login
      </Typography>

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        onClick={handleLogin}
      >
        Login
      </Button>

    </Box>

  );

};

export default LoginPage;