import { useEffect, useState } from "react";
import { getWorkers, createWorker, deleteWorker } from "../services/workersService";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const WorkersPage = () => {

  const [workers, setWorkers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("OUVRIER");


  const loadWorkers = async () => {

    const data = await getWorkers();

    setWorkers(data);

  };


  useEffect(() => {

    loadWorkers();

  }, []);


  const handleCreate = async () => {

    await createWorker({
      full_name: name,
      email: email,
      password: password,
      role: role
    });

    setName("");
    setEmail("");
    setPassword("");

    loadWorkers();

  };


  const handleDelete = async (id) => {

    await deleteWorker(id);

    loadWorkers();

  };


  return (

    <Paper style={{ padding: 20 }}>

      <h2>Create Worker</h2>

      <TextField
        label="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginLeft: 10 }}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginLeft: 10 }}
      />

      <TextField
        select
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ marginLeft: 10, width: 150 }}
      >

        <MenuItem value="OUVRIER">OUVRIER</MenuItem>
        <MenuItem value="CHEF">CHEF</MenuItem>
        <MenuItem value="ADMIN">ADMIN</MenuItem>

      </TextField>

      <Button
        variant="contained"
        onClick={handleCreate}
        style={{ marginLeft: 10 }}
      >
        Create
      </Button>


      <h2 style={{ marginTop: 30 }}>Workers</h2>

      {workers.map((w) => (

        <Paper
          key={w.id}
          style={{
            padding: 10,
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >

          <div>
            {w.full_name} — {w.role} — {w.email}
          </div>

          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(w.id)}
          >
            Delete
          </Button>

        </Paper>

      ))}

    </Paper>

  );

};

export default WorkersPage;