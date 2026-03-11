import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";

const ZonesProgressChart = ({ zones }) => {

  return (

    <Paper
      elevation={3}
      sx={{
        padding: 3,
        marginTop: 4
      }}
    >

      <Typography
        variant="h6"
        sx={{ marginBottom: 2 }}
      >
        Zones Progress
      </Typography>

      {zones.map((zone) => (

        <Box key={zone.id} sx={{ marginBottom: 2 }}>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 1
            }}
          >

            <Typography variant="body1">
              {zone.zone_name}
            </Typography>

            <Typography variant="body2">
              {zone.progress}%
            </Typography>

          </Box>

          <LinearProgress
            variant="determinate"
            value={zone.progress}
          />

        </Box>

      ))}

    </Paper>

  );

};

export default ZonesProgressChart;