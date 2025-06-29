import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { db } from "./database/index.js";
import { userRouter, authRouter } from "./route/index.js";
import { authenticateToken } from "./middleware/token-middleware.js";
import router from "./route/uploadRoutes.js";
import { createUploadsFolder } from "./security/helper.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(authenticateToken);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/file", router);

createUploadsFolder();

app.listen(port, () => {
  console.log(`Project running on port ${port}`);
  db();
});
