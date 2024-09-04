//mongodb+srv://adithya123:Adithya123@expenses.jtnm3be.mongodb.net/
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const cors = require("cors");
const financialRecords = require("./routes/financialRecords");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.use("/Records", financialRecords);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3001, () => {
      console.log("Server listening at port 3001");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
