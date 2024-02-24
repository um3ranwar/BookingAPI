import express from "express";
import bodyParser from "body-parser";
import clientRoutes from "./api/routes/clientRoute.js";
import businessRoutes from "./api/routes/businessRoute.js";
import { authenticate } from "./api/Middleware/authentication.js";
import userRoutes from "./api/routes/userRoute.js";
import agentRoutes from "./api/routes/agentRoute.js";
import dbPromise from "./api/models/index.js";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authenticate);
app.use("/api", userRoutes);
app.use("/api", agentRoutes);

app.use("/api/client", clientRoutes);
app.use("/api/business", businessRoutes);

async function startServer() {
  try {
    const db = await dbPromise;
    await db.sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}
startServer();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
