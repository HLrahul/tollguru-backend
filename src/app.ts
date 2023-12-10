import cors from "cors";
import http from "http";
import axios from "axios";
import express from "express";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.post("/tg", (req, res) => {
  axios
    .post(
      "https://apis.tollguru.com/toll/v2/origin-destination-waypoints/",
      req.body,
      {
        headers: {
          "x-api-key": "J69frFMBFthmPTH7HTTm7NgF7p4dFRNf",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Something went wrong");
    });
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log("Server is Up and Running!");
});
