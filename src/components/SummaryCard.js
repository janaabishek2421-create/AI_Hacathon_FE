import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

export default function SummaryCard({ summary, insights }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",       
        border: "1px solid rgba(226, 232, 240, 0.95)",
        boxShadow: "0 20px 40px rgba(15, 23, 42, 0.06)"
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 1.4 }}>
          AI Narrative
        </Typography>
        <Typography variant="h5" sx={{ mb: 1.5 }}>
          Executive Summary
        </Typography>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
          {summary || "Summary will appear after a comparison is completed."}
        </Typography>

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 3 }}>
          {insights?.map((i, idx) => (
            <Chip
              key={idx}
              label={i}
              sx={{             
                bgcolor: "#eef4fb",
                color: "#0f4c81",
                fontWeight: 600
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
