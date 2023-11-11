import React, { useState, useEffect } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import { IconButton } from "@mui/material";
import "./Puzzles.css";
import ReactCardFlip from "react-card-flip";
import TextField from "@mui/material/TextField";

function Puzzles() {
  const [puzzleList, setPuzzleList] = useState([]);
  const [flips, setFlips] = useState(Array(puzzleList.length).fill(false));
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    // Axios.get("http://192.168.50.213:3001/api/get-puzzles").then((response) => {
    Axios.get("http://localhost:3001/api/get-puzzles").then((response) => {
      console.log("hivja");
      setPuzzleList(response.data);
    });
  }, []);

  useEffect(() => {
    if (isDeleted) {
      console.log("deleted");
      // Axios.get("http://192.168.50.213:3001/api/get-puzzles").then(
      Axios.get("http://localhost:3001/api/get-puzzles").then((response) => {
        setPuzzleList(response.data);
      });
      setIsDeleted(false);
    }
  }, [isDeleted]);

  const deletePuzzle = (puzzleId) => {
    // Axios.delete(`http://192.168.50.213:3001/api/delete/${puzzleId}`).then(
    Axios.delete(`http://localhost:3001/api/delete/${puzzleId}`).then(() => {
      // getPuzzles();
    });
    setIsDeleted(true);
  };

  return (
    <div
      className="Puzzles"
      style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
    >
      {puzzleList.map((val, index) => {
        return (
          <ReactCardFlip
            isFlipped={flips[index]}
            flipDirection="horizontal"
            key={index}
          >
            <div className="puzzle_card" style={{}}>
              <Box
                sx={{
                  minWidth: 250,
                  p: "0px",
                  position: "relative",
                  maxWidth: "250px",
                }}
              >
                <IconButton style={{ position: "absolute", top: 0, right: 0 }}>
                  <CodeRoundedIcon
                    fontSize="large"
                    onClick={() => {
                      const newFlips = [...flips];
                      newFlips[index] = !newFlips[index];
                      setFlips(newFlips);
                    }}
                  />
                </IconButton>
                <IconButton
                  style={{ position: "absolute", bottom: 0, left: 0 }}
                >
                  <LoopRoundedIcon fontSize="large" />
                </IconButton>
                <IconButton
                  style={{ position: "absolute", bottom: 0, right: 0 }}
                >
                  <DeleteRoundedIcon
                    fontSize="large"
                    onClick={() => {
                      deletePuzzle(val.id);
                    }}
                  />
                </IconButton>
                <Card variant="outlined" sx={{ borderRadius: "30px" }}>
                  {
                    <React.Fragment>
                      <CardContent>
                        {/* <div style={{ position: 'relative' }}>
                      <IconButton style={{ position: 'absolute', top: 0, right: 0 }}>
                        <CodeRoundedIcon fontSize="large" />
                      </IconButton>
                    </div> */}
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {val.language}
                        </Typography>
                        <Typography variant="h5" component="div">
                          {val.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {val.difficulty}
                          <br />
                          {val.type}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* <IconButton>
                      <LoopRoundedIcon fontSize="large" />
                    </IconButton>
                    <IconButton >
                      <DeleteRoundedIcon fontSize="large" />
                    </IconButton> */}
                      </CardActions>
                    </React.Fragment>
                  }
                </Card>
              </Box>
            </div>

            <div
              className="puzzle_card"
              onMouseLeave={() => {
                const newFlips = [...flips];
                newFlips[index] = !newFlips[index];
                setFlips(newFlips);
              }}
              style={{}}
            >
              <Box
                sx={{
                  minWidth: 250,
                  p: "0px",
                  position: "relative",
                }}
              >
                <IconButton style={{ position: "absolute", top: 0, right: 0 }}>
                  <CodeRoundedIcon
                    fontSize="large"
                    onClick={() => {
                      const newFlips = [...flips];
                      newFlips[index] = !newFlips[index];
                      setFlips(newFlips);
                    }}
                  />
                </IconButton>
                <IconButton
                  style={{ position: "absolute", bottom: 0, left: 0 }}
                >
                  <LoopRoundedIcon fontSize="large" />
                </IconButton>
                <IconButton
                  style={{ position: "absolute", bottom: 0, right: 0 }}
                >
                  <DeleteRoundedIcon
                    fontSize="large"
                    onClick={() => {
                      deletePuzzle(val.id);
                    }}
                  />
                </IconButton>
                <Card variant="outlined" sx={{ borderRadius: "30px" }}>
                  {
                    <React.Fragment>
                      <CardContent>
                        {/* <div style={{ position: 'relative' }}>
                      <IconButton style={{ position: 'absolute', top: 0, right: 0 }}>
                        <CodeRoundedIcon fontSize="large" />
                      </IconButton>
                    </div> */}
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {val.language}
                        </Typography>
                        <Typography variant="h5" component="div">
                          {val.name}
                        </Typography>
                        <Typography
                          sx={{ mb: 1.5 }}
                          color="text.secondary"
                          component={"pre"}
                        >
                          {val.code}
                        </Typography>
                        {/* <TextField
                        multiline
                        defaultValue={val.code}
                        sx={{ width: '100%' }}
                      /> */}
                      </CardContent>
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* <IconButton>
                      <LoopRoundedIcon fontSize="large" />
                    </IconButton>
                    <IconButton >
                      <DeleteRoundedIcon fontSize="large" />
                    </IconButton> */}
                      </CardActions>
                    </React.Fragment>
                  }
                </Card>
              </Box>
            </div>
          </ReactCardFlip>
        );
      })}
    </div>
  );
}

export default Puzzles;
