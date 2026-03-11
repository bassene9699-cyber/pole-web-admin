import { useEffect, useState } from "react";

import { getDashboardStats } from "../services/dashboardService";
import { getInstallations } from "../services/installationsService";
import { getZoneAssignments } from "../services/projectsService";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import InstallationsMap from "../components/maps/InstallationsMap";
import NetworkChart from "../components/charts/NetworkChart";
import ZonesProgressChart from "../components/charts/ZonesProgressChart";


const StatCard = ({ title, value }) => {

  return (

    <Paper
      elevation={3}
      sx={{
        padding: 3,
        textAlign: "center"
      }}
    >

      <Typography
        variant="h6"
        sx={{ marginBottom: 1 }}
      >
        {title}
      </Typography>

      <Typography
        variant="h4"
        sx={{ fontWeight: "bold" }}
      >
        {value}
      </Typography>

    </Paper>

  );

};


const DashboardPage = () => {

  const [stats, setStats] = useState(null);
  const [installations, setInstallations] = useState([]);
  const [zones, setZones] = useState([]);


  useEffect(() => {

    const loadData = async () => {

      try {

        const statsData = await getDashboardStats();
        const installationsData = await getInstallations();
        const zonesData = await getZoneAssignments();

        const zonesWithProgress = zonesData.map((z) => {

          let progress = 0;

          if (z.status === "COMPLETED") progress = 100;
          else if (z.status === "PARTIAL") progress = 50;
          else progress = 10;

          return {
            ...z,
            progress
          };

        });

        setStats(statsData);
        setInstallations(installationsData);
        setZones(zonesWithProgress);

      } catch (error) {

        console.error("Dashboard loading error:", error);

      }

    };

    loadData();

  }, []);


  if (!stats) {
    return <p>Loading dashboard...</p>;
  }


  return (

    <Box sx={{ flexGrow: 1, padding: 3 }}>

      <Grid container spacing={3}>

        <Grid item xs={12} md={3}>
          <StatCard title="Projects" value={stats.projects || 0} />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard title="Zones Total" value={stats.zones_total || 0} />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard title="Zones Completed" value={stats.zones_completed || 0} />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard title="Zones Partial" value={stats.zones_partial || 0} />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard title="Installations Today" value={stats.installations_today || 0} />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard title="BT Installations" value={stats.bt_total || 0} />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard title="HTA Installations" value={stats.hta_total || 0} />
        </Grid>

      </Grid>


      <Box sx={{ marginTop: 6 }}>

        <NetworkChart
          bt={stats.bt_total || 0}
          hta={stats.hta_total || 0}
        />

      </Box>


      <Box sx={{ marginTop: 6 }}>

        <ZonesProgressChart zones={zones} />

      </Box>


      <Box sx={{ marginTop: 6 }}>

        <Typography
          variant="h6"
          sx={{ marginBottom: 2 }}
        >
          Installations Map
        </Typography>

        <InstallationsMap installations={installations} />

      </Box>

    </Box>

  );

};

export default DashboardPage;