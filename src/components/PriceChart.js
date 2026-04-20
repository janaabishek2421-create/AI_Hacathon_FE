import { Box, Paper, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export default function PriceChart({ data }) {
  if (!data?.length) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },      
        border: "1px solid rgba(226, 232, 240, 0.95)",
        boxShadow: "0 20px 40px rgba(15, 23, 42, 0.06)"
      }}
    >
      <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 1.4 }}>
        Market Position
      </Typography>
      <Typography variant="h5" sx={{ mb: 2.5 }}>
        Price Comparison
      </Typography>

      <Box sx={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 20, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dbe4ee" />
            <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: "rgba(15,76,129,0.06)" }} />
            <Bar dataKey="price" fill="#0f4c81" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
