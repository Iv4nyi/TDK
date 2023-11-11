require("dotenv").config();
const express = require("express");
const { exec } = require("child_process");
const { Configuration, OpenAI } = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const os = require("os");
const path = require("path");
const fs = require("fs");
const tf = require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const router = express.Router();

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let model;

use.load().then((m) => {
  model = m;
});

app.post("/api/similarity", async (req, res) => {
  const text1 = req.body.text1;
  const text2 = req.body.text2;

  if (!text1 || !text2) {
    return res
      .status(400)
      .send({ error: "Both text1 and text2 are required." });
  }

  try {
    const embeddings1 = await model.embed(text1);
    const embeddings2 = await model.embed(text2);
    console.error(embeddings1);
    console.error(embeddings2);

    const similarity = cosineSimilarity(
      embeddings1.arraySync()[0],
      embeddings2.arraySync()[0]
    );
    console.log(similarity);
    res.send({ similarity });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to compute similarity." });
  }
});

function cosineSimilarity(vecA, vecB) {
  const dot = (vecA, vecB) => {
    return vecA
      .map((val, i) => val * vecB[i])
      .reduce((acc, val) => acc + val, 0);
  };

  const mag = (vec) => {
    return Math.sqrt(
      vec.map((val) => val * val).reduce((acc, val) => acc + val, 0)
    );
  };

  return dot(vecA, vecB) / (mag(vecA) * mag(vecB));
}

// app.post('/api/openai', async (req, res) => {
//   const { language, prompt } = req.body;
//   console.log(language + "\n" + prompt)
//   // const language = req.body.language;
//   // const prompt = req.body.prompt;

//   try {
//     const gptResponse = await openai.complete({
//       engine: 'davinci-codex',
//       prompt: `${language}\n${prompt}`,
//       max_tokens: 100,
//     });

//     const { choices } = gptResponse.data;
//     const [firstChoice] = choices;

//     res.json(firstChoice);
//   } catch (error) {
//     res.status(500).json({ error: error.toString() });
//   }
// });

// app.post('/api/insert', async (req, res) => {
//   const language = req.body.movieName
//   const prompt = req.body.movieReview

//   const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);"
//   db.query(sqlInsert, [language, prompt], (err, result)=>{
//     if(err) {
//       console.log(err)
//       res.sendStatus(500) // send a 500 Internal Server Error status if there was an error
//     } else {
//       res.sendStatus(200) // send a 200 OK status if the query was successful
//     }
//   })
// });

module.exports = router;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",
  database: "YOUR_DB",
});

app.post("/api/save-puzzle", (req, res) => {
  // const { name, language, difficulty, prompt, code, explanation, solution } = req.body;

  const name = req.body.name;
  const language = req.body.language;
  const difficulty = req.body.difficulty;
  const prompt = req.body.prompt;
  const code = req.body.code;
  const explanation = req.body.explanation;
  const solution = req.body.solution;
  const type = req.body.type;

  const query =
    "INSERT INTO puzzles (name, language, difficulty, prompt, code, explanation, solution, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    name,
    language,
    difficulty,
    prompt,
    code,
    explanation,
    solution,
    type,
  ];

  db.query(query, values, (error) => {
    console.log(req.body);

    if (error) {
      return res.status(500).json({ error: error.toString() });
    }

    res.status(201).json({ message: "Puzzle saved successfully" });
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM puzzles WHERE id = ?";

  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
  });
});

app.get("/api/get-puzzles", (req, res) => {
  const sqlSelect = "SELECT * FROM puzzles;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get-puzzle", (req, res) => {
  const difficulty = req.query.difficulty;
  const language = req.query.language;
  const type = req.query.type;

  console.log(type);

  const sqlSelect =
    "SELECT * FROM puzzles WHERE LOWER(difficulty) = LOWER(?) AND LOWER(language) = LOWER(?) AND LOWER(type) = LOWER(?)";
  const values = [difficulty, language, type];

  db.query(sqlSelect, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching a random puzzle.");
      return;
    }

    // Check if any puzzles were found
    if (result.length === 0) {
      res
        .status(404)
        .send("No puzzles found for the specified difficulty and language.");
    } else {
      // Get a random puzzle from the result
      const randomPuzzle = result[Math.floor(Math.random() * result.length)];
      res.json(randomPuzzle);
    }
  });
});

// app.post("/api/run-python", async (req, res) => {
//   const pythonCode = req.body.code;
//   // console.log(pythonCode);
//   // Execute Python code as a child process
//   const tempFile = path.join(os.tmpdir(), `temp-python-${Date.now()}.py`);

//   fs.writeFile(tempFile, pythonCode, (err) => {
//     if (err) {
//       res.status(500).json({ error: err });
//       return;
//     }

//     exec(`python ${tempFile}`, (error, stdout, stderr) => {
//       // Delete the temporary file
//       fs.unlink(tempFile, (err) => {
//         if (err) console.error("Error deleting temp file:", err);
//       });

//       if (error) {
//         res.status(500).json({ error: stderr });
//       } else {
//         console.log(stdout);
//         // res.send(stdout);
//         res.json({ output: stdout });
//       }
//     });
//   });

//   // exec(`python -c "${pythonCode}"`, (error, stdout, stderr) => {
//   //   // exec(`python -c "print('Hello from Python!')"`, (error, stdout, stderr) => {
//   //   if (error) {
//   //     res.status(500).json({ error: stderr });
//   //   } else {
//   //     console.log(stdout);
//   //     res.send(stdout);
//   //     // res.json({ output: stdout });
//   //   }
//   // });
// });

app.post("/api/run-python", async (req, res) => {
  const pythonCode = req.body.code;
  const tempFile = path.join(os.tmpdir(), `temp-python-${Date.now()}.py`);

  fs.writeFile(tempFile, pythonCode, (err) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }

    exec(
      `docker run --rm -v ${tempFile}:/app/temp.py python-runner python /app/temp.py`,
      (error, stdout, stderr) => {
        fs.unlink(tempFile, (err) => {
          if (err) console.error("Error deleting temp file:", err);
        });
        if (error) {
          res.status(500).json({ error: stderr });
        } else {
          console.log(stdout);
          res.json({ output: stdout });
        }
      }
    );
  });
});

// app.get('/api/get', (req, res)=>{
//   const sqlSelect = "SELECT * FROM movie_reviews;"
//   db.query(sqlSelect, (err, result)=>{
//     res.send(result);
//   })
// })

// app.post("/api/insert", (req, res)=>{

//   const movieName = req.body.movieName
//   const movieReview = req.body.movieReview

//   const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);"
//   db.query(sqlInsert, [movieName, movieReview], (err, result)=>{
//     if(err) {
//       console.log(err)
//       res.sendStatus(500) // send a 500 Internal Server Error status if there was an error
//     } else {
//       res.sendStatus(200) // send a 200 OK status if the query was successful
//     }
//   })
// })

// app.delete('/api/delete/:movieName', (req, res)=> {
//   const name = req.params.movieName
//   const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";

//   db.query(sqlDelete, name, (err, result) => {
//     if(err) console.log(err)
//   })
// })

app.put("/api/update", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  const sqlUpdate =
    "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});
