import { Card, CardContent, Grid, Typography } from "@mui/material";

export default function KPISection({ subject, competitors }) {
  if (!subject || !competitors) return null;

  const compValues = Object.values(competitors);

  const avgPrice =
    compValues.length > 0
      ? compValues.reduce((sum, c) => sum + (c.price || 0), 0) / compValues.length
      : 0;

  const priceDiff = avgPrice ? ((subject.price - avgPrice) / avgPrice) * 100 : 0;
  const formatCurrency = (value) =>
    typeof value === "number" && !Number.isNaN(value) ? `$${Math.round(value).toLocaleString()}` : "N/A";

  const cards = [
    {
      label: "Asset Value",
      value: formatCurrency(subject.price),
      helper: "Reported subject property value"
    },
    {
      label: "Market Average",
      value: formatCurrency(avgPrice),
      helper: "Average across selected competitors"
    },
    {
      label: "Variance",
      value: `${priceDiff.toFixed(2)}%`,
      helper: priceDiff >= 0 ? "Above market benchmark" : "Below market benchmark"
    },
    {
      label: "Rent / SqFt",
      value: subject.rent || "N/A",
      helper: "Current rental rate signal"
    }
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((c, i) => (
        <Grid item xs={12} md={3} key={i}>
          <Card
            elevation={0}
            sx={{
              height: "100%",            
              border: "1px solid rgba(226, 232, 240, 0.95)",
              boxShadow: "0 20px 40px rgba(15, 23, 42, 0.06)"
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: 1.2 }}>
                {c.label}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1, mb: 0.75 }}>
                {c.value}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {c.helper}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
