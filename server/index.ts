import cors from "cors";
import express from "express";
import "dotenv/config";
import { toNodeHandler } from "better-auth/node";
import { PrismaClient } from "./generated/prisma";
import { auth } from "./utils/auth";

// ENV
const port = Number(process.env.PORT) || 3000;

const app = express();
const prisma = new PrismaClient();

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

app.get("/", async (req, res) => {
  const userCount = await prisma.user.count();
  res.json(
    userCount == 0
      ? "No users have been added yet."
      : "Some users have been added to the database.",
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
