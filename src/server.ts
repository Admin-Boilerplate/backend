import * as dotenv from "dotenv";
import cors from "cors";
import * as i18n from "i18n";
import helmet from "helmet";
import bodyParser from "body-parser";
import express from "express";

import connectDB from "../config/database";
import {BaseRoutes} from "./routes/api/_BaseRoutes";
import {localeOptions} from "./i18n/locale";
import path from "path";

const app = express();

dotenv.config({path: ".env"});

// Connect to MongoDB
connectDB();
i18n.configure(localeOptions);


app.use(cors());
app.use(helmet());
// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(i18n.init);
app.all("*", (req, res, next) => {
    req.setLocale(req.header("Accept-Language"));
    next();
});
app.use("/api", new BaseRoutes().makeRoutes());

const port = app.get("port");
const server = app.listen(port, () =>
    console.log(`Server started on port ${port}`)
);

export default server;
