import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const COLORS = ["#1976d2", "#ff9800"];

const NetworkChart = ({ bt, hta }) => {

  const data = [
    { name: "BT", value: bt },
    { name: "HTA", value: hta }
  ];

  return (

    <Box
      sx={{
        width: "100%",
        height: 320,
        background: "#fff",
        borderRadius: 2,
        padding: 2,
        boxShadow: 2
      }}
    >

      <Typography
        variant="h6"
        sx={{ textAlign: "center", marginBottom: 2 }}
      >
        Network Distribution
      </Typography>

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
          >

            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </Box>

  );

};

export default NetworkChart;