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

    alert("Zone created");

    setZoneName("");

    loadData();

  };

  const handleAssignZone = async () => {

    await createZoneAssignment(projectId, zoneId, teamId);

    alert("Zone assigned");

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

      {assignments.map((z) => (

        <Paper
          key={z.id}
          style={{
            padding: 10,
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >

          <div>

            <b>{z.zone_name}</b> — {z.project_name} — {z.team_name} — {z.status}

            <div style={{ marginTop: 10 }}>

              <Button
                variant="outlined"
                onClick={() => handleInstallations(z.id)}
              >
                Installations
              </Button>

              <Button
                variant="outlined"
                onClick={() => handleAuditLog(z.id)}
                style={{ marginLeft: 10 }}
              >
                Audit Log
              </Button>

              {z.status === "COMPLETED" && (
                <Button
                  variant="contained"
                  onClick={() => handlePDF(z.id)}
                  style={{ marginLeft: 10 }}
                >
                  PDF Report
                </Button>
              )}

            </div>

          </div>

          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(z.id)}
          >
            Delete
          </Button>

        </Paper>

      ))}


      <h2 style={{ marginTop: 40 }}>Installations</h2>

      {installations.map((i) => (

        <Paper key={i.id} style={{ padding: 10, marginTop: 10 }}>

          {i.pole_reference} — {i.network_type} — {i.installed_by}

        </Paper>

      ))}


      <h2 style={{ marginTop: 40 }}>Audit Log</h2>

      {auditLog.map((a, index) => (

        <Paper key={index} style={{ padding: 10, marginTop: 10 }}>

          {a.action} — {a.performed_by} — {a.timestamp}

        </Paper>

      ))}

    </Paper>

  );

};

export default ZonesPage;