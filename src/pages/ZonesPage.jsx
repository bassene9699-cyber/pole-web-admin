import { useEffect, useState } from "react";

import {
  getProjects,
  getTeams,
  createZoneAssignment,
  getZoneAssignments,
  getZoneInstallations,
  getZoneAuditLog,
  generateZonePDF,
  deleteZoneAssignment
} from "../services/projectsService";

import { getZoneCatalog, createZoneCatalog } from "../services/zonesService";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import { DataGrid } from "@mui/x-data-grid";

const ZonesPage = () => {

  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [zones, setZones] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [projectId, setProjectId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [zoneId, setZoneId] = useState("");

  const [zoneName, setZoneName] = useState("");
  const [networkType, setNetworkType] = useState("BT");

  const [installations, setInstallations] = useState([]);
  const [auditLog, setAuditLog] = useState([]);

  const loadData = async () => {

    const projectsData = await getProjects();
    const zonesData = await getZoneCatalog();
    const assignmentsData = await getZoneAssignments();

    setProjects(projectsData);
    setZones(zonesData);
    setAssignments(assignmentsData);

  };

  useEffect(() => {
    loadData();
  }, []);

  const loadTeams = async (projectId) => {

    const teamsData = await getTeams(projectId);

    setTeams(teamsData);

  };

  const handleCreateZone = async () => {

    await createZoneCatalog(zoneName, networkType);

    setZoneName("");

    loadData();

  };

  const handleAssignZone = async () => {

    await createZoneAssignment(projectId, zoneId, teamId);

    setProjectId("");
    setTeamId("");
    setZoneId("");

    loadData();

  };

  const handleInstallations = async (id) => {

    const data = await getZoneInstallations(id);

    setInstallations(data);

  };

  const handleAuditLog = async (id) => {

    const data = await getZoneAuditLog(id);

    setAuditLog(data);

  };

  const handlePDF = async (id) => {

    const data = await generateZonePDF(id);

    const url = `http://127.0.0.1:8000/${data.file_path}`;

    window.open(url, "_blank");

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this zone assignment?")) return;

    await deleteZoneAssignment(id);

    loadData();

  };


  const assignmentColumns = [

    { field: "id", headerName: "ID", width: 90 },

    { field: "zone_name", headerName: "Zone", flex: 1 },

    { field: "project_name", headerName: "Project", flex: 1 },

    { field: "team_name", headerName: "Team", flex: 1 },

    { field: "status", headerName: "Status", width: 140 },

    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => (

        <div style={{ display: "flex", gap: 10 }}>

          <Button
            variant="outlined"
            onClick={() => handleInstallations(params.row.id)}
          >
            Installations
          </Button>

          <Button
            variant="outlined"
            onClick={() => handleAuditLog(params.row.id)}
          >
            Audit Log
          </Button>

          {params.row.status === "COMPLETED" && (

            <Button
              variant="contained"
              onClick={() => handlePDF(params.row.id)}
            >
              PDF
            </Button>

          )}

          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>

        </div>

      )
    }

  ];


  const installationColumns = [

    { field: "id", headerName: "ID", width: 90 },

    { field: "pole_reference", headerName: "Pole", flex: 1 },

    { field: "network_type", headerName: "Network", flex: 1 },

    { field: "installed_by", headerName: "Installed By", flex: 1 }

  ];


  const auditColumns = [

    { field: "action", headerName: "Action", flex: 1 },

    { field: "performed_by", headerName: "User", flex: 1 },

    { field: "timestamp", headerName: "Timestamp", flex: 1 }

  ];


  return (

    <Paper style={{ padding: 20 }}>

      <h2>Create Zone</h2>

      <TextField
        label="Zone name"
        value={zoneName}
        onChange={(e) => setZoneName(e.target.value)}
      />

      <TextField
        select
        label="Network Type"
        value={networkType}
        onChange={(e) => setNetworkType(e.target.value)}
        style={{ marginLeft: 10, width: 200 }}
      >

        <MenuItem value="BT">BT</MenuItem>
        <MenuItem value="HTA">HTA</MenuItem>
        <MenuItem value="BT_HTA">BT + HTA</MenuItem>

      </TextField>

      <Button
        variant="contained"
        onClick={handleCreateZone}
        style={{ marginLeft: 10 }}
      >
        Create Zone
      </Button>


      <h2 style={{ marginTop: 40 }}>Assign Zone</h2>

      <TextField
        select
        label="Project"
        value={projectId}
        onChange={(e) => {

          setProjectId(e.target.value);
          loadTeams(e.target.value);

        }}
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
        label="Team"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        style={{ marginLeft: 10, width: 200 }}
      >

        {teams.map((t) => (

          <MenuItem key={t.id} value={t.id}>
            {t.name}
          </MenuItem>

        ))}

      </TextField>

      <TextField
        select
        label="Zone"
        value={zoneId}
        onChange={(e) => setZoneId(e.target.value)}
        style={{ marginLeft: 10, width: 200 }}
      >

        {zones.map((z) => (

          <MenuItem key={z.id} value={z.id}>
            {z.name}
          </MenuItem>

        ))}

      </TextField>

      <Button
        variant="contained"
        onClick={handleAssignZone}
        style={{ marginLeft: 10 }}
      >
        Assign Zone
      </Button>


      <h2 style={{ marginTop: 40 }}>Assigned Zones</h2>

      <div style={{ height: 400 }}>

        <DataGrid
          rows={assignments}
          columns={assignmentColumns}
          pageSizeOptions={[5, 10, 20]}
        />

      </div>


      <h2 style={{ marginTop: 40 }}>Installations</h2>

      <div style={{ height: 300 }}>

        <DataGrid
          rows={installations}
          columns={installationColumns}
          pageSizeOptions={[5]}
        />

      </div>


      <h2 style={{ marginTop: 40 }}>Audit Log</h2>

      <div style={{ height: 300 }}>

        <DataGrid
          rows={auditLog}
          columns={auditColumns}
          pageSizeOptions={[5]}
        />

      </div>

    </Paper>

  );

};

export default ZonesPage;