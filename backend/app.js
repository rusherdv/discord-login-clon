import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
dotenv.config();
app.use(express.static("public"));
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en: http://localhost:${port}`);
});
