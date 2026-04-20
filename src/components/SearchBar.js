import {
  Box,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography
} from "@mui/material";

export default function SearchBar({ query, setQuery, suggestions, onSelect, onSearch }) {
  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        fullWidth
        label="Property Address"
        placeholder="Search by street, building, or parcel address"
        value={query}
        onChange={onSearch}
        onBlur={() => setTimeout(() => setQuery((current) => current), 100)}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: "rgba(255,255,255,0.96)",          
          },
          "& .MuiInputLabel-root": {
            color: "rgba(15,23,42,0.72)"
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography sx={{ color: "text.secondary", fontWeight: 700 }}>
                Search
              </Typography>
            </InputAdornment>
          )
        }}
      />

      {suggestions.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            position: "absolute",
            top: "calc(100% + 10px)",
            left: 0,
            right: 0,
            zIndex: 10,
            overflow: "hidden",           
            border: "1px solid rgba(148, 163, 184, 0.24)",
            boxShadow: "0 18px 40px rgba(15, 23, 42, 0.14)"
          }}
        >
          <List disablePadding>
            {suggestions.map((s, i) => (
              <ListItemButton
                key={i}
                onClick={() => onSelect(s)}
                sx={{
                  py: 1.6,
                  px: 2,
                  borderBottom:
                    i === suggestions.length - 1 ? "none" : "1px solid rgba(226, 232, 240, 0.9)"
                }}
              >
                <ListItemText
                  primary={s.standardLongAddress}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "text.primary"
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
