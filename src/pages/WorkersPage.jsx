import { useEffect, useState } from "react";
import { getWorkers, createWorker, deleteWorker } from "../services/workersService";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import { DataGrid } from "@mui/x-data-grid";

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


  const columns = [

    { field: "id", headerName: "ID", width: 90 },

    { field: "full_name", headerName: "Name", flex: 1 },

    { field: "email", headerName: "Email", flex: 1 },

    { field: "role", headerName: "Role", width: 130 },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (

        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>

      )
    }

  ];


  return (

    <Paper style={{ padding: 20 }}>

      <h2>Create Worker</h2>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>

        <TextField
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <TextField
          select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: 150 }}
        >

          <MenuItem value="OUVRIER">OUVRIER</MenuItem>
          <MenuItem value="CHEF">CHEF</MenuItem>
          <MenuItem value="ADMIN">ADMIN</MenuItem>

        </TextField>

        <Button
          variant="contained"
          onClick={handleCreate}
        >
          Create
        </Button>

      </div>


      <h2 style={{ marginTop: 30 }}>Workers</h2>

      <div style={{ height: 400, width: "100%" }}>

        <DataGrid
          rows={workers}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } }
          }}
        />

      </div>

    </Paper>

  );

};

export default WorkersPage;