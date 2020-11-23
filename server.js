import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "config";

/*** Custom Component ***/
import dataRoute from "./routes/route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}

console.log(`Application name: ${config.get("name")}`);
console.log(`Application name: ${config.get("mail.host")}`);
console.log(`Application name: ${config.get("mail.password")}`);

const port = process.env.PORT || 3000;

app.use("/api/data", dataRoute);

app.listen(port, () => {
  return console.log(`server started on port ${port}...`);
});
