import { Grid, Stack, Typography } from "@mui/material";
import KPISection from "./KPISection";
import MetricsChart from "./MetricsChart";
import SummaryCard from "./SummaryCard";
import ComparisonTable from "./ComparisonTable";

export default function AnalyticsDashboard({ result }) {
  if (!result) return null;

  // Normalize subject data (IMPORTANT)
  const property = result.subject?.property?.[0];

  const subject = {
    price: property?.totalMarketValue,
    rent: property?.rentalRate,
    size: property?.buildingArea,
    occupancy: property?.occupancy
  };

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 1.4 }}>
          Performance Dashboard
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Comparative Insights
        </Typography>
      </div>

      <KPISection subject={subject} competitors={result.competitors} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={5}>
          <SummaryCard
            summary={result.aiResult.summary}
            insights={result.aiResult.insights}
          />
        </Grid>
        <Grid item xs={12} lg={7}>
          <MetricsChart subject={subject} competitors={result.competitors} />
        </Grid>
      </Grid>

      <ComparisonTable data={result.aiResult} />
    </Stack>
  );
}
