const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT || 3001;

const { gift } = require("./scripts/gift");

app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hi there");
});

app.post("/gift", async (req, res) => {
  console.log("req: ", req.body);

  const { recipient, tokenURI, amount, value } = req.body;
  const txnResponse = await gift(recipient, tokenURI, amount, value);

  res.send({
    message: "Gifting successful!",
    txnResponse: txnResponse,
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
