require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const routes = require("./routes");
const { migrateDatas } = require("./migrations/migrate");

app.use(express.static("./public"));
app.use(express.json()); 

//routes
app.get("/health", (req, res) => {
  res.json({ message: "Health check ok" });
});

app.use("/api/v1/", routes);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server listening on port ${port}`));
    await migrateDatas();
  } catch (error) {
    console.log(`Error occured : ${error}`);
  }
};

start();
