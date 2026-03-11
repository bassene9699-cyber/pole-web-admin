import { useEffect, useState } from "react";
import api from "../services/api";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";

const ProjectsPage = () => {

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {

    await api.post("/projects", { name });

    setName("");

    fetchProjects();
  };

  const deleteProject = async (id) => {

    await api.delete(`/projects/${id}`);

    fetchProjects();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    { field: "name", headerName: "Project Name", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteProject(params.row.id)}
        >
          Delete
        </Button>
      )
    }
  ];

  return (

    <div>

      <h2>Projects</h2>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>

        <TextField
          label="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={createProject}
        >
          Create
        </Button>

      </div>

      <div style={{ height: 400 }}>

        <DataGrid
          rows={projects}
          columns={columns}
          pageSize={5}
        />

      </div>

    </div>

  );

};

export default ProjectsPage;