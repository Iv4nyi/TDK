import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import EditableCodeTextbox from "./components/EditableCodeTextbox";
import savedApiResponse from "./api-response.json";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Upload from "./Pages/Upload";
import Play from "./Pages/Play";
import Lobby from "./Pages/Lobby";
import ErrorPage from "./Pages/ErrorPage";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
  UploadRounded,
  SportsEsportsRounded,
  HomeRounded,
  ExtensionRounded,
} from "@mui/icons-material";
import Puzzles from "./Pages/Puzzles";

const App = () => {
  
  const drawerWidth = 180;

  return (
    <Router>
      {/* <nav>
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/profile"> Profile </Link>
      </nav>
      <Button variant="contained" color="secondary">Gomb</Button> */}

      <Box
        sx={{ display: "flex", backgroundColor: "#f7f2ee", minHeight: "100vh" }}
      >
        <CssBaseline />

        {/* <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#f7f2ee",
              borderWidth: "0",
              margin: "100px",
              maxHeight: "calc(100vh - 979px)",
            },
          }}
          variant="permanent"
          anchor="left"
        > */}
        <Box
          sx={{
            width: drawerWidth,
            maxHeight: "300px",
            // maxHeight: "calc(100vh - 979px)",
            flexShrink: 0,
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
            margin: "20px",
            // padding: "20px",
          }}
        >
          <Toolbar>
            <Typography variant="h6" fontFamily={"Segoe UI"}>
              Secret Script
            </Typography>
          </Toolbar>
          <Divider />
          <List>
            <ListItem sx={{}} key={"Home"} disablePadding color="primary">
              <ListItemButton href="/">
                <ListItemIcon>
                  <HomeRounded fontSize="large" />
                </ListItemIcon>
                <ListItemText sx={{}} primary={"Home"} />
              </ListItemButton>
            </ListItem>

            <ListItem sx={{}} key={"Play"} disablePadding>
              <ListItemButton href="/lobby">
                <ListItemIcon>
                  <SportsEsportsRounded fontSize="large" />
                </ListItemIcon>
                <ListItemText sx={{}} primary={"Play"} />
              </ListItemButton>
            </ListItem>

            <ListItem sx={{}} key={"Upload"} disablePadding>
              <ListItemButton href="/upload">
                <ListItemIcon>
                  <UploadRounded fontSize="large" />
                </ListItemIcon>
                <ListItemText sx={{}} primary={"Upload"} />
              </ListItemButton>
            </ListItem>

            <ListItem sx={{}} key={"Puzzles"} disablePadding>
              <ListItemButton href="/puzzles">
                <ListItemIcon>
                  <ExtensionRounded fontSize="large" />
                </ListItemIcon>
                <ListItemText sx={{}} primary={"Puzzles"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        {/* </Drawer> */}
        {/* <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: '#f7f2ee', p: 3 }}
        > */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1, // Allow this container to grow
            flexBasis: 0, // Ensure all available space is distributed
            pl: "20px",
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/puzzles" element={<Puzzles />} />
            <Route path="/play" element={<Play />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
