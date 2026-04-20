import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

export default function ComparisonTable({ data }) {
  if (!data?.comparisonTable) return null;

  const competitors = Array.from(
  new Set(
    data.comparisonTable.flatMap(row =>
      Object.keys(row.competitors || {})
    )
  )
);

  return (
    <Paper
      elevation={0}
      sx={{      
        overflow: "hidden",
        border: "1px solid rgba(226, 232, 240, 0.95)",
        boxShadow: "0 20px 40px rgba(15, 23, 42, 0.06)"
      }}
    >
      <Typography variant="h6" sx={{ px: 3, pt: 3, pb: 1 }}>
        Detailed Comparison Matrix
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#f8fafc",
                "& .MuiTableCell-root": {
                  fontWeight: 700,
                  color: "#334155",
                  borderBottom: "1px solid rgba(226, 232, 240, 1)"
                }
              }}
            >
              <TableCell>Metric</TableCell>
              <TableCell>Your Property</TableCell>
              {competitors.map(c => (
                <TableCell key={c}>{c.toUpperCase()}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
  {data.comparisonTable.map((row, i) => (
    <TableRow key={i} hover>
      <TableCell sx={{ fontWeight: 700 }}>
        {row.metric}
      </TableCell>

      <TableCell>
        {row.yourData ?? "-"}
      </TableCell>

      {competitors.map(c => (
        <TableCell key={c}>
          {row.competitors?.[c] ?? "-"}
        </TableCell>
      ))}
    </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
