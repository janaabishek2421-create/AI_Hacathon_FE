import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
  createTheme
} from "@mui/material";
import SearchBar from "./components/SearchBar";
import CompetitorSelector from "./components/CompetitorSelector";
import PriceChart from "./components/PriceChart";
import { suggestAddress, compareProperty } from "./services/api";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0f4c81"
    },
    secondary: {
      main: "#1f6f8b"
    },
    background: {
      default: "#f4f7fb",
      paper: "#ffffff"
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569"
    }
  },
  shape: {
    borderRadius: 20
  },
  typography: {
    fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h2: {
      fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
      fontWeight: 700,
      lineHeight: 1.1
    },
    h5: {
      fontWeight: 700
    },
    button: {
      fontWeight: 700,
      textTransform: "none"
    }
  }
});

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [sites, setSites] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.length > 3) {
      const res = await suggestAddress(val);
      setSuggestions(res.data.suggests);
    } else {
      setSuggestions([]);
    }
  };

  const selectAddress = (item) => {
    setSelected(item);
    setQuery(item.standardLongAddress);
    setSuggestions([]);
  };

  const handleCompare = async () => {
    if (!selected) {
      return;
    }

    setLoading(true);

    try {
      const res = await compareProperty({
        address: selected.standardLongAddress,
        sites
      });

      setResult(res.data);
    } finally {
      setLoading(false);
    }
  };

  const chartData = useMemo(() => {
    if (!result?.competitors) {
      return [];
    }

    return Object.entries(result.competitors).map(([key, val]) => ({
        name: key,
        price: val.price || 0
      }));
  }, [result]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top left, rgba(15,76,129,0.14), transparent 30%), linear-gradient(180deg, #eef4fb 0%, #f7f9fc 42%, #edf2f7 100%)",
          py: { xs: 4, md: 8 }
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Paper
              elevation={0}
              sx={{
                position: "relative",
                overflow: "hidden",
                p: { xs: 3, md: 5 },
                border: "1px solid rgba(148, 163, 184, 0.18)",
                background:
                  "linear-gradient(135deg, rgba(12,37,62,0.98) 0%, rgba(15,76,129,0.96) 56%, rgba(31,111,139,0.94) 100%)",
                color: "#fff",
                boxShadow: "0 24px 60px rgba(15, 23, 42, 0.16)"
              }}
            >
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", md: "center" }}
                >
                  <Box maxWidth={780}>
                    <Chip
                      label="Commercial Intelligence Platform"
                      sx={{
                        mb: 2,
                        bgcolor: "rgba(255,255,255,0.14)",
                        color: "#fff",                       
                      }}
                    />
                    <Typography variant="h2" gutterBottom>
                      Property Comparison Dashboard
                    </Typography>
                    <Typography sx={{ maxWidth: 720, color: "rgba(255,255,255,0.82)" }}>
                      Analyze a property against market listings with a cleaner, executive-style
                      workflow built for fast decision-making and clearer pricing insight.
                    </Typography>
                  </Box>
                  <Paper
                    elevation={0}
                    sx={{
                      minWidth: { xs: "100%", md: 260 },
                      p: 2.5,                    
                      bgcolor: "rgba(255,255,255,0.12)",
                      color: "#fff",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.16)"
                    }}
                  >
                    <Typography variant="overline" sx={{ letterSpacing: 1.2, color: "rgba(255,255,255,0.72)" }}>
                      Comparison Status
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 0.5 }}>
                      {result ? "Analysis Ready" : "Awaiting Input"}
                    </Typography>
                    <Typography sx={{ mt: 1, color: "rgba(255,255,255,0.78)" }}>
                      {selected
                        ? selected.standardLongAddress
                        : "Select a property and competitor sources to begin."}
                    </Typography>
                  </Paper>
                </Stack>

                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, md: 3 },                 
                    bgcolor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(12px)"
                  }}
                >
                  <Stack spacing={3}>
                    <SearchBar
                      query={query}
                      setQuery={setQuery}
                      suggestions={suggestions}
                      onSelect={selectAddress}
                      onSearch={handleSearch}
                    />

                    <Stack
                      direction={{ xs: "column", lg: "row" }}
                      spacing={2}
                      alignItems={{ xs: "stretch", lg: "center" }}
                      justifyContent="space-between"
                    >
                      <CompetitorSelector sites={sites} setSites={setSites} />

                      <Button
                        variant="contained"
                        onClick={handleCompare}
                        disabled={!selected || loading}
                        sx={{
                          minWidth: 220,
                          px: 4,
                          py: 1.6,
                          borderRadius: 999,
                          bgcolor: "#ffffff",
                          color: "#0f4c81",
                          boxShadow: "0 12px 24px rgba(15, 23, 42, 0.18)",
                          "&:hover": {
                            bgcolor: "#e6eef7"
                          },
                          "&.Mui-disabled": {
                            bgcolor: "rgba(255,255,255,0.2)",
                            color: "rgba(255,255,255,0.55)"
                          }
                        }}
                      >
                        {loading ? "Analyzing..." : "Run Comparison"}
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              </Stack>
            </Paper>

            {loading && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,                
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  boxShadow: "0 20px 40px rgba(15, 23, 42, 0.06)"
                }}
              >
                <CircularProgress size={26} />
                <Box>
                  <Typography fontWeight={700}>Generating market comparison</Typography>
                  <Typography color="text.secondary">
                    Pulling competitor data and preparing AI-backed analysis.
                  </Typography>
                </Box>
              </Paper>
            )}

            {result && (
              <Stack spacing={4}>
                <PriceChart data={chartData} />
                <AnalyticsDashboard result={result} />
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
