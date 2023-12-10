import cors from "cors";
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

app.post("/", (req, res) => {
  console.log(req.body);

  axios
    .post(
      "https://apis.tollguru.com/toll/v2/origin-destination-waypoints/",
      req.body,
      {
        headers: {
          "x-api-key": process.env.TOLLGURU_API_KEY,
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

app.listen(port, () => {
  console.log("Started!");
});
