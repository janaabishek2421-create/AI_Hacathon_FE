import { Box, Checkbox, FormControlLabel, Paper, Stack, Typography } from "@mui/material";

const siteMeta = {
  //loopnet: "Marketplace listings and broker-facing comps",
  crexi: "Commercial sale and lease listing coverage",
  //hcad: "Public appraisal and assessed value context"
};

export default function CompetitorSelector({ sites, setSites }) {
  const toggle = (site) => {
    setSites(prev =>
      prev.includes(site) ? prev.filter(s => s !== site) : [...prev, site]
    );
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Typography variant="subtitle2" sx={{ color: "rgba(255,255,255,0.72)", mb: 1 }}>
        Data Sources
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
        {[ "crexi"].map(site => {
          const checked = sites.includes(site);

          return (
            <Paper
              key={site}
              elevation={0}
              sx={{
                flex: 1,
                minWidth: 180,
                px: 1.5,
                py: 1.2,               
                bgcolor: checked ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)",
                border: checked
                  ? "1px solid rgba(255,255,255,0.28)"
                  : "1px solid rgba(255,255,255,0.14)"
              }}
            >
              <FormControlLabel
                sx={{ m: 0, alignItems: "flex-start" }}
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => toggle(site)}
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      "&.Mui-checked": {
                        color: "#fff"
                      }
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: "#fff" }}>
                      {site.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.68)" }}>
                      {siteMeta[site]}
                    </Typography>
                  </Box>
                }
              />
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}
