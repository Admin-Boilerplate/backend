import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import express from "express";

import connectDB from "../config/database";
import {BaseRoutes} from "./routes/api/_BaseRoutes";

const app = express();

dotenv.config({path: ".env"});

// Connect to MongoDB
connectDB();


app.use(cors());
app.use(helmet());
// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/api", new BaseRoutes().makeRoutes());

const port = app.get("port");
const server = app.listen(port, () =>
    console.log(`Server started on port ${port}`)
);
export default server;
