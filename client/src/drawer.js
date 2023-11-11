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
} from "@mui/icons-material";

const App = () => {
  /*--------------------------------------------------------------------*/
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("");

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };
  /*--------------------------------------------------------------------*/

  const [text, setText] = useState("");
  const [language, setLanguage] = useState("Python");
  const [code, setCode] = useState("");
  const [puzzleName, setPuzzleName] = useState("");
  const [puzzleDifficulty, setPuzzleDifficulty] = useState("");
  const [puzzleLanguage, setPuzzleLanguage] = useState("");
  const [puzzlePrompt, setPuzzlePrompt] = useState("");
  const [puzzleCode, setPuzzleCode] = useState("");
  const [puzzleExplanation, setPuzzleExplanation] = useState("");
  const [puzzleSolution, setPuzzleSolution] = useState("");
  const [apiData, setApiData] = useState(null);
  const [puzzleList, setPuzzleList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get-puzzles").then((response) => {
      setPuzzleList(response.data);
    });
    setApiData(savedApiResponse);
  }, []);

  const languages = ["Python", "Java", "Javascript", "C", "C++"];

  const generateCode = async () => {
    try {
      const response = await Axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a programming teacher. You make up different programming tasks for people for different ages and different skills. You follow the given instructions on which programming language to use, and how difficult code you should write, and you also don't name the functions accordingly to what they do, so that pupils can find it out themselves, you always name it "mysterious_function". Your task is to generate code on given programming languages, for your students to figure out what the code does, hence improving their code understanding ability.
              Deliver your response in valid json format, because it will be stored in a database with the following keys: "name" for the name of the function, "language" for the programming language the code is written in, "difficulty" for how difficult you think the code is values can be {easy, medium, hard} , "prompt" for a possible prompt that you could generate this function for, "code" for the actual code puzzle, "explanation" for the explanation of the code, "solution" for the correct answer for the puzzle. 
              In the name key please provide the correct name according to what the function actually does (so not "mysterious_function"), but in the code key always name it "mysterious_function".
              You should randomly choose a difficulty if it is not provided.
              The user input will be like "Generate a code in {programming language} with {difficulty} difficulty" or "Generate a code in {programming language} with random difficulty"`,
            },
            {
              role: "user",
              content: `Generate a code in ${language} with ${text} difficulty`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      console.log(response);
      const generatedCode = JSON.parse(
        response.data.choices[0].message.content
      );
      // console.log(generatedCode.json())
      console.log(generatedCode);
      setCode(generatedCode.code);

      setPuzzleName(generatedCode.name);
      setPuzzleLanguage(generatedCode.language);
      setPuzzleDifficulty(generatedCode.difficulty);
      setPuzzlePrompt(generatedCode.prompt);
      setPuzzleExplanation(generatedCode.explanation);
      setPuzzleSolution(generatedCode.solution);
      setPuzzleCode(generatedCode.code);

      saveResponseToFile(response.data);
    } catch (error) {
      console.error(error);
      alert("Error occurred during code generation");
    }
  };

  const offlineGenerateCode = () => {
    const generatedCode = JSON.parse(apiData.choices[0].message.content);
    // console.log(generatedCode.json())
    console.log(generatedCode);
    setCode(generatedCode.code);

    setPuzzleName(generatedCode.name);
    setPuzzleLanguage(generatedCode.language);
    setPuzzleDifficulty(generatedCode.difficulty);
    setPuzzlePrompt(generatedCode.prompt);
    setPuzzleExplanation(generatedCode.explanation);
    setPuzzleSolution(generatedCode.solution);
    setPuzzleCode(generatedCode.code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateCode();
    // offlineGenerateCode();
  };

  const uploadPuzzle = () => {
    Axios.post("http://localhost:3001/api/save-puzzle", {
      name: puzzleName,
      language: puzzleLanguage,
      difficulty: puzzleDifficulty,
      prompt: puzzlePrompt,
      code: puzzleCode,
      explanation: puzzleExplanation,
      solution: puzzleSolution,
    }).then((res) => {
      alert(res.data.message);
    });
  };

  const deletePuzzle = (puzzle) => {
    Axios.delete(`http://localhost:3001/api/delete/${puzzle}`);
  };

  function saveResponseToFile(data) {
    // Create a Blob containing the data
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an <a> element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "api-response.json";

    // Simulate a click on the <a> element to trigger the download
    a.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
  }

  const drawerWidth = 180;

  return (
    <Router>
      {/* <nav>
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/profile"> Profile </Link>
      </nav>
      <Button variant="contained" color="secondary">Gomb</Button> */}

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#f7f2ee",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <Typography variant="h6" fontFamily={"Segoe UI"}>
              Secret Script
            </Typography>
          </Toolbar>
          <Divider />
          <List>
            <ListItem sx={{}} key={"Home"} disablePadding>
              <ListItemButton href="/">
                <ListItemIcon>
                  <HomeRounded fontSize="large" />
                </ListItemIcon>
                <ListItemText sx={{}} primary={"Home"} />
              </ListItemButton>
            </ListItem>

            <ListItem sx={{}} key={"Play"} disablePadding>
              <ListItemButton href="/play">
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
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f7f2ee", p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/play" element={<Play />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
