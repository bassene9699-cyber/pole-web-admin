import api from "./api";


// =========================
// PROJECTS
// =========================

export const getProjects = async () => {

  const res = await api.get("/projects/");

  return res.data;

};

export const createProject = async (name, description) => {

  const res = await api.post("/projects/", {
    name,
    description
  });

  return res.data;

};

export const deleteProject = async (id) => {

  await api.delete(`/projects/${id}`);

};


// =========================
// TEAMS
// =========================

export const createTeam = async (name, project_id, leader_id) => {

  const res = await api.post("/projects/teams", {
    name,
    project_id,
    leader_id
  });

  return res.data;

};

export const getTeams = async (projectId) => {

  const res = await api.get(`/projects/${projectId}/teams`);

  return res.data;

};

export const deleteTeam = async (teamId) => {

  await api.delete(`/projects/teams/${teamId}`);

};


// =========================
// ZONE ASSIGNMENTS
// =========================

export const createZoneAssignment = async (project_id, zone_catalog_id, team_id) => {

  const res = await api.post("/projects/zone-assignments", {
    project_id,
    zone_catalog_id,
    team_id
  });

  return res.data;

};

export const getZoneAssignments = async () => {

  const res = await api.get("/projects/zones");

  return res.data;

};

export const deleteZoneAssignment = async (assignmentId) => {

  await api.delete(`/projects/zone-assignments/${assignmentId}`);

};


// =========================
// INSTALLATIONS
// =========================

export const getZoneInstallations = async (assignmentId) => {

  const res = await api.get(`/mobile/zones/${assignmentId}/installations`);

  return res.data;

};

export const getZoneAuditLog = async (assignmentId) => {

  const res = await api.get(`/mobile/zones/${assignmentId}/audit-log`);

  return res.data;

};

export const generateZonePDF = async (assignmentId) => {

  const res = await api.get(`/mobile/zones/${assignmentId}/report/pdf`);

  return res.data;

};
