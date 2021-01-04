import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import Debug from "debug";

/*** Custom Component ***/
import dataRoute from "./routes/route.js";

const app = express();
const StartUpDebugger = Debug('app:startup');
const debDebugger = Debug('app:db');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  StartUpDebugger("Morgan enabled...");
  debDebugger('MongoDB connected')
}

// console.log(`Application name: ${config.get("name")}`);
// console.log(`Application name: ${config.get("mail.host")}`);
// console.log(`Application name: ${config.get("mail.password")}`);

const port = process.env.PORT || 3000;

app.use("/api/data", dataRoute);

app.listen(port, () => {
  return console.log(`server started on port ${port}...`);
});
