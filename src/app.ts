import express from "express";
import axios from "axios";

const app = express()
const port = 3000

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);

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
})