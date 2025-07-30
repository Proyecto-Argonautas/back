import cors from "cors";
import express from "express";
import "dotenv/config";
import { toNodeHandler } from "better-auth/node";
import { errorAleMiddleware } from "./middleware/errors";
import travelRoutes from "./routes/travelRoutes";
import userRoutes from "./routes/userRoutes";
import { auth } from "./utils/auth";

// import userRoutes from './routes/userRoutes';

// ENV
const port = Number(process.env.PORT) || 3000;

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }),
);

// BETTER-AUTH
app.all("/api/auth/*splat", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.use("/user", userRoutes);
app.use("/travel", travelRoutes);

// app.use(errorAleMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
