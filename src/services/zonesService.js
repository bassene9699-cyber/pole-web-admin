import api from "./api";

export const getZoneCatalog = async () => {

  const res = await api.get("/zone-catalog");

  return res.data;

};

export const createZoneCatalog = async (name, networkType) => {

  const res = await api.post("/zone-catalog", {
    name: name,
    allowed_network_type: networkType
  });

  return res.data;

};