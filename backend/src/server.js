import path from "path";
import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';

const server = express();

mongoose.connect(process.env.DB_URL);

server.use(cors());
server.use(express.json());
server.use(routes);
server.use("/images", express.static(path.join(__dirname, "..", "uploads")));
server.listen(8080);