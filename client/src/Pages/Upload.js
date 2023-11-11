import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Upload.css";
import EditableCodeTextbox from "../components/EditableCodeTextbox";
import savedApiResponse from "../api-response.json";
import {
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Paper,
  FormLabel,
  TextField,
} from "@mui/material";
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

function Upload() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("Python");
  const [difficulty, setDifficulty] = useState("Easy");
  const [type, setType] = useState("Code description");
  const [code, setCode] = useState("");
  const [puzzleName, setPuzzleName] = useState("");
  const [puzzleDifficulty, setPuzzleDifficulty] = useState("");
  const [puzzleLanguage, setPuzzleLanguage] = useState("");
  const [puzzlePrompt, setPuzzlePrompt] = useState("");
  const [puzzleCode, setPuzzleCode] = useState("");
  const [puzzleExplanation, setPuzzleExplanation] = useState("");
  const [puzzleSolution, setPuzzleSolution] = useState("");
  const [puzzleType, setPuzzleType] = useState("");
  const [apiData, setApiData] = useState(null);
  const [puzzleList, setPuzzleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [algo, setAlgo] = useState("");

  useEffect(() => {
    // Axios.get("http://192.168.50.213:3001/api/get-puzzles").then((response) => {
    Axios.get("http://localhost:3001/api/get-puzzles").then((response) => {
      setPuzzleList(response.data);
    });
    setApiData(savedApiResponse);
  }, []);

  const languages = ["Python", "Java", "Javascript", "C", "C++"];
  const difficulties = ["Easy", "Medium", "Hard"];
  const types = [
    "Code description",
    "Error finder",
    "Prompt construction",
    "Output",
  ];

  const generateCode = async (usermsg, sysmsg) => {
    try {
      console.log("sima call lefut");

      const response = await Axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          // model: "gpt-3.5-turbo",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: sysmsg,
            },
            {
              role: "user",
              content: usermsg,
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
      setPuzzleType(type);
      setLoading(false);

      // saveResponseToFile(response.data);
    } catch (error) {
      console.error(error);
      alert("Error occurred during code generation");
    }
  };

  const generateCodeAlgo = async (usermsg, sysmsg) => {
    try {
      console.log("algorithm call lefut");
      const response = await Axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          // model: "gpt-3.5-turbo",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: sysmsg,
            },
            {
              role: "user",
              content: usermsg,
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
      setPuzzleType(type);

      setLoading(false);

      // saveResponseToFile(response.data);
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
    var answer = window.confirm("Online API hívás legyen?");
    if (answer) {
      setLoading(true);
      if (algo) {
        console.log("algo call");
        // "Code description", "Error finder", "Prompt construction"
        if (type === "Code description" || type === "Output") {
          console.log(type + " call");
          const usermsg = `Generate a code in ${language} for this algorithm description:
          ${algo}`;
          const sysmsg = `You are a programming teacher. You make up different programming tasks for people for different ages and
          different skills. You follow the given instructions on which programming language to use, and what algorithm you
          should write, and you also don't name the functions accordingly to what they do, so that pupils can find it out
          themselves, you always name it "mysterious_function". Your task is to generate code on given programming languages, for
          your students to figure out what the code does, hence improving their code understanding ability. 
          Make sure to always include a line where you try the function and print out the result. If the described algorithm doesn't contain printing of the test restults, then extend it!
          Deliver your response in valid json format, because it will be stored in a database with the following keys: "name" for
          the name of the function, "language" for the programming language the code is written in, "difficulty" for how difficult
          you think the code is values can be {easy, medium, hard} , "prompt" for a possible prompt that you could generate this
          function for, "code" for the actual code puzzle, "explanation" for the explanation of the code, "solution" for the
          correct answer for the puzzle.
          In the name key please provide the correct name according to what the function actually does (so not
          "mysterious_function"), but in the code key always name it "mysterious_function".
          You should randomly choose a difficulty if it is not provided.
          The user input will be like "Generate a code in {programming language} for this algorithm description: 
          {algorithm}"`;

          generateCodeAlgo(usermsg, sysmsg);
        } else if (type === "Error finder") {
          console.log("Error finder call");
          const usermsg = `Generate a code with an error in ${language} for this algorithm description:
          ${algo}`;

          const sysmsg = `You are a programming teacher. You make up different programming tasks for people for different ages and
          different skills. You follow the given instructions on which programming language to use, and what algorithm you
          should write, and you also don't name the functions accordingly to what they do, so that pupils can find it out
          themselves, you always name it "mysterious_function". Your task is to generate code on given programming languages with a small error, for
          your students to figure out where the error is, hence improving their code understanding ability.
          Make sure to always include a faulty line and a line where you try the function and print out the result. 
          The faulty line is very important and you must not forget it, and the print as well. If the described algorithm doesn't contain printing of the test restults, then extend it!
          Deliver your response in valid json format, because it will be stored in a database with the following keys: "name" for
          the name of the function, "language" for the programming language the code is written in, "difficulty" for how difficult
          you think the code is values can be {easy, medium, hard} , "prompt" for a possible prompt that you could generate this
          function for, "code" for the actual code puzzle, "explanation" for the explanation of the code, "solution" for the
          correct answer for the puzzle.
          In the name key please provide the correct name according to what the function actually does (so not
          "mysterious_function"), but in the code key always name it "mysterious_function".
          You should randomly choose a difficulty if it is not provided.
          The user input will be like "Generate a code with an error in {programming language} for this algorithm description: 
          {algorithm}"`;

          generateCodeAlgo(usermsg, sysmsg);
        } else if (type === "Prompt construction") {
          console.log("Prompt construction call");
          const usermsg = `Generate a code in ${language} for this algorithm description:
          ${algo}`;
          const sysmsg = `You are a programming teacher. You make up different programming tasks for people for different ages and
          different skills. You follow the given instructions on which programming language to use, and what algorithm you
          should write, and you also don't name the functions accordingly to what they do, so that pupils can find it out
          themselves, you always name it "mysterious_function". Your task is to generate code on given programming languages, for
          your students to figure out what the code does, hence improving their code understanding ability. 
          Make sure to always include a line where you try the function and print out the result. If the described algorithm doesn't contain printing of the test restults, then extend it!
          Deliver your response in valid json format, because it will be stored in a database with the following keys: "name" for
          the name of the function, "language" for the programming language the code is written in, "difficulty" for how difficult
          you think the code is values can be {easy, medium, hard} , "prompt" for a possible prompt that you could generate this
          function for, "code" for the actual code puzzle, "explanation" for the explanation of the code, "solution" for the
          correct answer for the puzzle.
          In the name key please provide the correct name according to what the function actually does (so not
          "mysterious_function"), but in the code key always name it "mysterious_function".
          You should randomly choose a difficulty if it is not provided.
          The user input will be like "Generate a code in {programming language} for this algorithm description: 
          {algorithm}"`;
          generateCodeAlgo(usermsg, sysmsg);
        }
        // generateCodeAlgo(algo);
      } else {
        console.log("sima call");
        if (type === "Code description" || type === "Output") {
          console.log(type + " call");
          const usermsg = `Generate a code in ${language} with ${difficulty} difficulty`;
          const sysmsg = `You are a programming teacher. You make up different programming tasks for people for different ages and
          different skills. You follow the given instructions on which programming language to use, and how difficult code you
          should write, and you also don't name the functions accordingly to what they do, so that pupils can find it out
          themselves, you always name it "mysterious_function". Your task is to generate code on given programming languages, for
          your students to figure out what the code does, hence improving their code understanding ability. 
          Make sure to always include a line where you try the function and print out the result.
          Deliver your response in valid json format, because it will be stored in a database with the following keys: "name" for
          the name of the function, "language" for the programming language the code is written in, "difficulty" for how difficult
          you think the code is values can be {easy, medium, hard} , "prompt" for a possible prompt that you could generate this
          function for, "code" for the actual code puzzle, "explanation" for the explanation of the code, "solution" for the
          correct answer for the puzzle.
          In the name key please provide the correct name according to what the function actually does (so not
          "mysterious_function"), but in the code key always name it "mysterious_function".
          You should randomly choose a difficulty if it is not provided.
          The user input will be like "Generate a code in {programming language} with {difficulty} difficulty" or "Generate a code
          in {programming language} with random difficulty"`;

          generateCode(usermsg, sysmsg);
        } else if (type === "Error finder") {
          console.log("Error finder call");
          const usermsg = `Generate a code with an error in ${language} with ${difficulty} difficulty`;

          const sysmsg = `You are a programming teacher. You make up different programming tasks for people for different ages and
          different skills. You follow the given instructions on which programming language to use, and how difficult code you
          should write, and you also don't name the functions accordingly to what they do, so that pupils can find it out
          themselves, you always name it "mysterious_function". Your task is to generate code on given programming languages with a small error, for
          your students to figure out where the error is, hence improving their code understanding ability. 
          Make sure to always include a faulty line and a line where you try the function and print out the result.
          The faulty line is very important and you must not forget it, and the print as well.
          Deliver your response in valid json format, because it will be stored in a database with the following keys: "name" for
          the name of the function, "language" for the programming language the code is written in, "difficulty" for how difficult
          you think the code is values can be {easy, medium, hard} , "prompt" for a possible prompt that you could generate this
          function for, "code" for the actual code puzzle, "explanation" for the explanation of the code, "solution" for the
          correct answer for the puzzle.
          In the name key please provide the correct name according to what the function actually does (so not
          "mysterious_function"), but in the code key always name it "mysterious_function".
          You should randomly choose a difficulty if it is not provided.
          The user input will be like "Generate a code with an error in {programming language} with {difficulty} difficulty"`;

          generateCode(usermsg, sysmsg);
        } else if (type === "Prompt construction") {
          console.log("Prompt construction call");
          const usermsg = `Generate a code in ${language} with ${difficulty} difficulty`;
          const sysmsg = `You are a programming teacher. You make up different programming tasks for people for different ages and
          different skills. You follow the given instructions on which programming language to use, and how difficult code you
          should write, and you also don't name the functions accordingly to what they do, so that pupils can find it out
          themselves, you always name it "mysterious_function". Your task is to generate code on given programming languages, for
          your students to figure out what the code does, hence improving their code understanding ability. 
          Make sure to always include a line where you try the function and print out the result.
          Deliver your response in valid json format, because it will be stored in a database with the following keys: "name" for
          the name of the function, "language" for the programming language the code is written in, "difficulty" for how difficult
          you think the code is values can be {easy, medium, hard} , "prompt" for a possible prompt that you could generate this
          function for, "code" for the actual code puzzle, "explanation" for the explanation of the code, "solution" for the
          correct answer for the puzzle.
          In the name key please provide the correct name according to what the function actually does (so not
          "mysterious_function"), but in the code key always name it "mysterious_function".
          You should randomly choose a difficulty if it is not provided.
          The user input will be like "Generate a code in {programming language} with {difficulty} difficulty" or "Generate a code
          in {programming language} with random difficulty"`;

          generateCode(usermsg, sysmsg);
        }
        // generateCode(usermsg, sysmsg);
      }
    } else {
      offlineGenerateCode();
    }
  };

  const handleAlgoChange = (event) => {
    setAlgo(event.target.value);
    // console.log(algo);
  };

  const uploadPuzzle = () => {
    // Axios.post("http://192.168.50.213:3001/api/save-puzzle", {
    Axios.post("http://localhost:3001/api/save-puzzle", {
      name: puzzleName,
      language: puzzleLanguage,
      difficulty: puzzleDifficulty,
      prompt: puzzlePrompt,
      code: puzzleCode,
      explanation: puzzleExplanation,
      solution: puzzleSolution,
      type: puzzleType,
    }).then((res) => {
      alert(res.data.message);
    });
  };

  const deletePuzzle = (puzzle) => {
    // Axios.delete(`http://192.168.50.213:3001/api/delete/${puzzle}`);
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
            console.log(data);
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

  return (
    <Container
      sx={{
        marginTop: "40px",
        display: "flex",
        justifyContent: "center",
        width: "fit-content",
      }}
    >
      <Paper
        sx={{
          // minWidth: "500px",
          // width: "fit-content",
          padding: "40px",
          borderRadius: "8px",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
        }}
      >
        <Typography
          variant="h1"
          fontSize="2em"
          marginBottom="20px"
          align="center"
        >
          Function Generator
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <FormLabel component="legend">Difficulty</FormLabel>
            <Select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              label="Difficulty"
            >
              {difficulties.map((diff) => (
                <MenuItem key={diff} value={diff}>
                  {diff}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <FormLabel component="legend">Language</FormLabel>
            <Select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              label="Language"
            >
              {languages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <FormLabel component="legend">Type</FormLabel>
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Type"
            >
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Algorithm"
            fullWidth
            variant="outlined"
            margin="normal"
            value={algo}
            onChange={handleAlgoChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Generate
          </Button>
        </form>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          code && (
            <Box>
              <Typography variant="h2" fontSize="1.5em" margin="30px 0 10px 0">
                Code
              </Typography>
              <EditableCodeTextbox
                code={code}
                onCodeChange={handleCodeChange}
                readOnly={false}
                saveVisible={true}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={uploadPuzzle}
                  sx={{ marginRight: "10px" }}
                >
                  Upload
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={runPython}
                >
                  Run
                </Button>
              </Box>
            </Box>
          )
        )}
      </Paper>
    </Container>
  );
}

export default Upload;
