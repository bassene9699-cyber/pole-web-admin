import api from "./api";

export const getInstallations = async () => {

  const response = await api.get("/mobile/admin/installations");

  return response.data;

};

export const validateInstallation = async (id) => {

  await api.post(`/mobile/admin/installations/${id}/validate`);

};

export const rejectInstallation = async (id, reason) => {

  const formData = new FormData();
  formData.append("reason", reason);

  await api.post(`/mobile/admin/installations/${id}/reject`, formData);

};

export const deleteInstallation = async (id) => {

  await api.delete(`/mobile/installations/${id}`);

};