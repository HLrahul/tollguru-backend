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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running perfectly...");
});

app.post("/tg", (req, res) => {
  axios
    .post(
      "https://apis.tollguru.com/toll/v2/origin-destination-waypoints/",
      req.body,
      {
        headers: {
          "x-api-key": process.env.TOLLGURU_API_KEY || "Fmpf37tPbg3HGN2h9mfnJRjgnBjHQTHM",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is Up and Running on Port: ${PORT}`);
});
