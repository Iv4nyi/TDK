import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import {
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import "./Play.css";
import EditableCodeTextbox from "../components/EditableCodeTextbox";
import ScoringBoard from "../components/ScoringBoard";
import {
  Audio,
  BallTriangle,
  Bars,
  Blocks,
  Circles,
  CirclesWithBar,
  ColorRing,
  Comment,
  Discuss,
  Dna,
  FallingLines,
  FidgetSpinner,
  Grid,
  Hearts,
  Hourglass,
  InfinitySpin,
  LineWave,
  MagnifyingGlass,
  MutatingDots,
  Oval,
  ProgressBar,
  Puff,
  Radio,
  RevolvingDot,
  Rings,
  RotatingLines,
  RotatingSquare,
  RotatingTriangles,
  TailSpin,
  ThreeCircles,
  ThreeDots,
  Triangle,
  Vortex,
  Watch,
} from "react-loader-spinner";

function getRandomItemFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function Play() {
  const [puzzleList, setPuzzleList] = useState([]);
  const [randomPuzzle, setRandomPuzzle] = useState(null);
  const [solution, setSolution] = useState("");
  const [puzzleCode, setPuzzleCode] = useState("");
  const [answer, setAnswer] = useState("");
  const [pythonResult, setPythonResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPython, setShowPython] = useState(false);
  const [score, setScore] = useState(0);
  // let openaiCheckResult;
  // let openaiRunResult;
  const [openaiCheckResult, setOpenaiCheckResult] = useState("");
  const [openaiRunResult, setOpenaiRunResult] = useState("");

  const location = useLocation();
  const params = new URLSearchParams(window.location.search);
  const { name, difficulty, language, type } = location.state || {};
  // const decodedDifficulty = decodeURIComponent(params.get("difficulty"));
  // const decodedLanguage = decodeURIComponent(params.get("language"));
  // const playerName = decodeURIComponent(params.get("name"));
  const decodedDifficulty = decodeURIComponent(difficulty);
  // let realDifficulty;
  const [realDifficulty, setRealDifficulty] = useState("easy");
  const decodedLanguage = decodeURIComponent(language);
  const playerName = decodeURIComponent(name);
  const decodedType = decodeURIComponent(type);
  const scores = [
    { name: playerName, score: score },
    // { name: "Player 2", score: 80 },
    // { name: "Player 3", score: 120 },
  ];

  useEffect(() => {
    // Axios.get("http://192.168.50.213:3001/api/get-puzzles").then((response) => {
    //   setPuzzleList(response.data);
    // });
    if (decodedDifficulty != "adaptive") {
      setRealDifficulty(decodedDifficulty);
    }
    getPuzzle();
  }, []);

  const getPuzzle = () => {
    // console.log(decodedDifficulty);
    // console.log(decodedLanguage);
    // console.log(realDifficulty);

    // Axios.get(`http://192.168.50.213:3001/api/get-puzzle/`, {
    Axios.get(`http://localhost:3001/api/get-puzzle/`, {
      params: {
        difficulty: decodedDifficulty,
        // difficulty: realDifficulty,
        language: decodedLanguage,
        type: decodedType,
      },
    })
      .then((response) => {
        setRandomPuzzle(response.data);
        setPuzzleCode(response.data.code);
      })
      .catch((error) => {
        // Handle errors here
      });
  };

  useEffect(() => {
    // console.log(difficulty);
    // console.log(language);
    if (puzzleList.length > 0) {
      const randomPuzzleItem = getRandomItemFromArray(puzzleList);
      setRandomPuzzle(randomPuzzleItem);
      setPuzzleCode(randomPuzzleItem.code);
    }
  }, [puzzleList]);

  const handleRandomPuzzleClick = () => {
    setAnswer("");
    setSolution("");
    setOpenaiCheckResult("");
    setOpenaiRunResult("");
    setShowPython(false);
    // console.log(answer);
    if (answer.result == "correct") {
      setScore(score + 1);
      if (decodedDifficulty == "adaptive") {
        console.log(decodedDifficulty == "adaptive");

        switch (realDifficulty) {
          case "easy":
            setRealDifficulty("medium");
            break;
          case "medium":
            setRealDifficulty("hard");
            break;
          default:
            break;
        }
      }
    }
    console.log(realDifficulty);

    getPuzzle();
  };

  const handleCheckClick = () => {
    // if (solution === randomPuzzle.solution) {
    //   alert("Helyes!");
    // } else {
    //   alert("Helytelen!");
    // }
    setLoading(true);
    // getSolution();
    checkOpenai();
  };

  const handleSolutionChange = (event) => {
    setSolution(event.target.value);
    // console.log(solution)
  };

  const handleCodeChange = (newCode) => {
    console.log("New code value:", newCode);
    setPuzzleCode(newCode); // Update the code state if needed
  };

  const runPython = () => {
    // Axios.post("http://192.168.50.213:3001/api/run-python", {
    Axios.post("http://localhost:3001/api/run-python", {
      // code: JSON.stringify({ puzzleCode }),
      code: puzzleCode,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          if (typeof data === "object" && data !== null) {
            console.log(data.output);
            setPythonResult(data.output);
          } else {
            console.error("Invalid JSON response:", data);
          }
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
        }
        setShowPython(true);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  };

  const similarity = () => {
    Axios.post("http://localhost:3001/api/similarity", {
      // code: JSON.stringify({ puzzleCode }),
      text1: "I am delighted",
      text2: "I am happy",
    })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          if (typeof data === "object" && data !== null) {
            console.log(data.similarity);
          } else {
            console.error("Invalid JSON response:", data);
          }
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  };

  const getSolution = async (systemMsg, userMsg) => {
    try {
      const response = await Axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: systemMsg,
            },
            {
              role: "user",
              content: userMsg,
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
      const generatedAnswer = JSON.parse(
        response.data.choices[0].message.content
      );
      // console.log(generatedCode.json())
      console.log(generatedAnswer);
      setAnswer(generatedAnswer);
      // alert(generatedAnswer.result);
      setLoading(false);
      return generatedAnswer;
    } catch (error) {
      console.error(error);
      alert("Error occurred during code generation");
    }
  };

  const runOpenai = async () => {
    setLoading(true);
    try {
      const systemMessage = `You are a Python interpreter. You will be provided Python codes that you have to run and have to return their outputs. Deliver your answer in valid json format with the key
      'result'. The user input will in the following format:
      "The code: 
      {puzzleCode}"`;
      const userMessage = `The code: 
      ${puzzleCode}`;
      console.log(systemMessage);
      console.log(userMessage);
      const response = await getSolution(systemMessage, userMessage);
      setOpenaiRunResult(response.result);
    } catch (error) {
      console.error(error);
      alert("Error occurred during code generation");
    }
  };

  const checkOpenai = async () => {
    try {
      const systemMessage = `You are a programming teacher. The students are provided with a code snippet, and they have to figure it out what it does.
      Your task is to check their description of the problem and tell them whether it's correct or not. Deliver you answer in valid json format with the key
      'result' and it can only have the values 'correct, partially correct, incorrect'. If it is partially correct or incorrect, please provide a little help with the key 'hint', 
      but make sure it doesn't contain the whole solution, only hints. 
      The user input will be like: "Please check my solution for this code: {code} 
      My solution is the following: {solution}"`;
      const userMessage = `Please check my solution for this code: ${puzzleCode} 
      My solution is the following: ${solution}`;
      console.log(systemMessage);
      console.log(userMessage);
      const response = await getSolution(systemMessage, userMessage);
      setOpenaiCheckResult(response.result);
    } catch (error) {
      console.error(error);
      alert("Error occurred during code generation");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        // padding: "40px",
        // margin: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          // justifyContent: "space-between",
          padding: "40px",
          maxWidth: "800px",
          // margin: "40px auto",
          // margin: "40px auto",
          marginTop: "40px",
          marginX: "auto",

          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
        }}
      >
        <div>
          {randomPuzzle && (
            <div>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {randomPuzzle.language}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  textTransform: "lowercase",
                }}
              >
                {randomPuzzle.difficulty}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  textTransform: "lowercase",
                }}
              >
                {randomPuzzle.type}
              </Typography>
              <br />
              <div className="codebox">
                <EditableCodeTextbox
                  code={puzzleCode}
                  onCodeChange={handleCodeChange}
                  readOnly={true}
                  saveVisible={false}
                />
              </div>
            </div>
          )}
          <TextField
            multiline
            rows={4}
            label="Solution"
            sx={{ display: "flex", flexDirection: "row", marginTop: "10px" }}
            onChange={handleSolutionChange}
            value={solution}
            fullWidth
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {solution && (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "10px" }}
                  onClick={handleCheckClick}
                  // onClick={similarity}
                >
                  Check
                </Button>
                {/* {randomPuzzle.language === "Python" && (
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ margin: "10px" }}
                      onClick={runPython}
                    >
                      Run
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ margin: "10px" }}
                      onClick={runOpenai}
                    >
                      Run with OpenAI
                    </Button>
                  </Box>
                )} */}
              </div>
            )}
          </div>
          {loading && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Dna />
            </div>
          )}
          <div>
            {openaiCheckResult && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    Your answer is {openaiCheckResult}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      margin: "10px",
                      alignSelf: "center",
                    }}
                    onClick={handleRandomPuzzleClick}
                  >
                    Get Another Random Puzzle
                  </Button>
                </div>
              </>
            )}
          </div>
          {solution && (
            <div>
              {randomPuzzle.language === "Python" && (
                <Box>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ margin: "10px" }}
                      onClick={runPython}
                    >
                      Run
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ margin: "10px" }}
                      onClick={runOpenai}
                    >
                      Run with OpenAI
                    </Button>
                  </div>
                  {showPython && (
                    <div>
                      <Typography variant="h6" sx={{ textAlign: "center" }}>
                        The result is: {pythonResult}
                      </Typography>
                    </div>
                  )}

                  {openaiRunResult && (
                    <div>
                      <Typography variant="h6" sx={{ textAlign: "center" }}>
                        The OpenAI result is: {`${openaiRunResult}`}
                      </Typography>
                    </div>
                  )}
                </Box>
              )}
            </div>
          )}
        </div>
      </Box>
      <div style={{ marginRight: "40px" }}>
        <ScoringBoard scores={scores} />
      </div>
    </Box>
  );
}

export default Play;
