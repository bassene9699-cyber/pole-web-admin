import { useEffect, useState } from "react";

import { createTeam, getProjects, getTeams, deleteTeam } from "../services/projectsService";
import { getWorkers } from "../services/workersService";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import { DataGrid } from "@mui/x-data-grid";

const TeamsPage = () => {

  const [projects, setProjects] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [name, setName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [leaderId, setLeaderId] = useState("");

  const loadData = async () => {

    const projectsData = await getProjects();
    const workersData = await getWorkers();

    setProjects(projectsData);
    setWorkers(workersData);

    let allTeams = [];

    for (let p of projectsData) {

      const teamsData = await getTeams(p.id);

      const teamsWithProject = teamsData.map(t => ({

        ...t,
        project_name: p.name,
        leader_name: workersData.find(w => w.id === t.leader_id)?.full_name

      }));

      allTeams = [...allTeams, ...teamsWithProject];

    }

    setTeams(allTeams);

  };

  useEffect(() => {
    loadData();
  }, []);


  const handleCreate = async () => {

    await createTeam(name, projectId, leaderId);

    setName("");
    setProjectId("");
    setLeaderId("");

    await loadData();

  };


  const handleDelete = async (id) => {

    if (!window.confirm("Delete this team?")) return;

    await deleteTeam(id);

    loadData();

  };


  const columns = [

    { field: "id", headerName: "ID", width: 90 },

    { field: "name", headerName: "Team Name", flex: 1 },

    { field: "project_name", headerName: "Project", flex: 1 },

    { field: "leader_name", headerName: "Leader", flex: 1 },

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

      <h2>Create Team</h2>

      <Box style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>

        <TextField
          label="Team name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          select
          label="Project"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          style={{ width: 200 }}
        >

          {projects.map((p) => (

            <MenuItem key={p.id} value={p.id}>
              {p.name}
            </MenuItem>

          ))}

        </TextField>

        <TextField
          select
          label="Leader"
          value={leaderId}
          onChange={(e) => setLeaderId(e.target.value)}
          style={{ width: 200 }}
        >

          {workers
            .filter(w => w.role === "CHEF")
            .map((w) => (

              <MenuItem key={w.id} value={w.id}>
                {w.full_name}
              </MenuItem>

            ))}

        </TextField>

        <Button
          variant="contained"
          onClick={handleCreate}
        >
          Create
        </Button>

      </Box>


      <h2 style={{ marginTop: 40 }}>Teams</h2>

      <div style={{ height: 400, width: "100%" }}>

        <DataGrid
          rows={teams}
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

export default TeamsPage;