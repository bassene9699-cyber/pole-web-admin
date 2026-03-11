import api from "./api";

export const getDashboardStats = async () => {

  try {

    const res = await api.get("/admin/dashboard");

    return res.data;

  } catch (error) {

    console.error("Dashboard stats error:", error);

    return {
      projects: 0,
      zones_total: 0,
      zones_completed: 0,
      zones_partial: 0,
      installations_today: 0,
      bt_total: 0,
      hta_total: 0
    };

  }

};