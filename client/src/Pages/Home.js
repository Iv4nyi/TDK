import React from "react";
import { Typography, Box } from "@mui/material";

function Home() {
  return (
    <div>
      <Box
        className="Home"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px",
          margin: "40px auto",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          maxWidth: "1500px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h3"> Welcome to Secret Script!</Typography>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <video autoPlay muted loop style={{ width: "100%", height: "auto" }}>
            <source src="/myvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Box>
    </div>
  );
}

export default Home;
