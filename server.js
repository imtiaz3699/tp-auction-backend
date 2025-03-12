import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routes from './src/routes/index.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());





(async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL, {})
      .then(() => console.log("Mongodb Connected."))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
  }
})();
app.get("/", (req, res) => {
  res.send("API Is running");
});
app.use("/",routes)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
