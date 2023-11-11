import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import "./Lobby.css";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [language, setLanguage] = useState("Python");
  const [type, setType] = useState("Code description");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("started");
    event.preventDefault(); // Prevent the default form submission behavior
    const encodedDifficulty = encodeURIComponent(difficulty);
    const encodedLanguage = encodeURIComponent(language);
    const encodedName = encodeURIComponent(name);
    const encodedType = encodeURIComponent(type);
    navigate("/play", {
      state: {
        name: encodedName,
        difficulty: encodedDifficulty,
        language: encodedLanguage,
        type: encodedType,
      },
    });
    // navigate(
    //   `/play?name=${encodedName}&difficulty=${encodedDifficulty}&language=${encodedLanguage}`
    // );
    // navigate(`/play?difficulty=${difficulty}&language=${language}`);
  };

  return (
    <Container maxWidth="md">
      <Box className="Lobby">
        <Typography variant="h4" gutterBottom>
          Game Lobby
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={name}
            onChange={handleNameChange}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Difficulty</FormLabel>
            <RadioGroup
              row
              value={difficulty}
              onChange={handleDifficultyChange}
            >
              <FormControlLabel value="easy" control={<Radio />} label="Easy" />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="hard" control={<Radio />} label="Hard" />
              <FormControlLabel
                value="adaptive"
                control={<Radio />}
                label="Adaptive"
              />
            </RadioGroup>
          </FormControl>

          <FormControl variant="outlined" fullWidth margin="normal">
            <FormLabel component="legend">Select Language</FormLabel>
            <Select
              label="Language"
              value={language}
              onChange={handleLanguageChange}
            >
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="Javascript">Javascript</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="C++">C++</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <FormLabel component="legend">Select Puzzle Type</FormLabel>
            <Select label="Type" value={type} onChange={handleTypeChange}>
              <MenuItem value="Code description">Code description</MenuItem>
              <MenuItem value="Error finder">Error finder</MenuItem>
              <MenuItem value="Prompt construction">
                Prompt construction
              </MenuItem>
              <MenuItem value="Output">Output</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            href="/play"
          >
            Start Game
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Lobby;
