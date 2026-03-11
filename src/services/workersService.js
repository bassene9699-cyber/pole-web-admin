import api from "./api";


// =========================
// GET ALL WORKERS
// =========================

export const getWorkers = async () => {

  const res = await api.get("/workers/");

  return res.data;

};


// =========================
// CREATE WORKER
// =========================

export const createWorker = async (worker) => {

  const res = await api.post("/workers/", worker);

  return res.data;

};


// =========================
// GET CHEFS
// =========================

export const getChefs = async () => {

  const res = await api.get("/workers/");

  return res.data.filter(w => w.role === "CHEF");

};


// =========================
// DELETE WORKER
// =========================

export const deleteWorker = async (id) => {

  await api.delete(`/workers/${id}`);

};


// =========================
// SET MOBILE ACCESS
// =========================

export const setMobileAccess = async (workerId, allowed) => {

  const res = await api.patch(
    `/workers/${workerId}/mobile-access`,
    null,
    {
      params: { allowed }
    }
  );

  return res.data;

};