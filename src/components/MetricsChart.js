import { Box, Paper, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export default function MetricsChart({ subject, competitors }) {
  if (!subject || !competitors) return null;

  const data = Object.entries(competitors).map(([key, val]) => ({
    name: key,
    price: val.price || 0,
    rent: val.rent_per_sqft || 0,
    size: val.building_size || 0
  }));

  data.push({
    name: "Your Property",
    price: subject.price || 0,
    rent: subject.rent || 0,
    size: subject.size || 0
  });

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        p: { xs: 2.5, md: 3 },      
        border: "1px solid rgba(226, 232, 240, 0.95)",
        boxShadow: "0 20px 40px rgba(15, 23, 42, 0.06)"
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Multi-Metric Comparison
      </Typography>
      <Box sx={{ width: "100%", height: 360 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dbe4ee" />
            <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="price" name="Price" fill="#0f4c81" radius={[8, 8, 0, 0]} />
            <Bar dataKey="rent" name="Rent" fill="#1f6f8b" radius={[8, 8, 0, 0]} />
            <Bar dataKey="size" name="Size" fill="#7c9fbf" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
