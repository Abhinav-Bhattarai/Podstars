import express from "express";
import mongoose from "mongoose";
import https from "https";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const ExpressGraphQL = require("express-graphql").graphqlHTTP;
import depthLimit from "graphql-depth-limit";
import LoginRoute from './Router/login-router.js';
import SignupRoute from './Router/signup-router.js';
import http from 'http';

import checkAuthorizationRouter from './Router/checkAuthorization.js';
import { MainSchema } from "./GraphQL/mainQL.js";
import redis from 'async-redis';
dotenv.config();

export const cache = redis.createClient({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: 18074
});

const app = express();
const PORT = 8080;
// const options = {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem"),
// };
// const server = https.createServer(options, app);
const server = http.createServer(app);

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(cookieParser());

// graphql
app.use(
  "/graphql",
  ExpressGraphQL({
    graphiql: true,
    schema: MainSchema,
    // prevention from circular query
    validationRules: [depthLimit(2)]
  })
);

// RestAPi endpoints
app.use('/checkAuthorization', checkAuthorizationRouter);
app.use('/login', LoginRoute);
app.use('/signup', SignupRoute);

// DB config
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch(() => {
    console.log("did not connect to mongoDB");
  });

// main serverListener
server.listen(PORT, () => {
  console.log(`connected to PORT: ${PORT}`);
});
