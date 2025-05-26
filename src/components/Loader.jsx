import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" padding={4}>
      <CircularProgress
        size={60}
        thickness={6}
        sx={{ color: "rgb(75 85 99)" }}
      />
    </Box>
  );
};

export default Loader;
