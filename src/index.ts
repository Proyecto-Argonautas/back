import express from 'express';
import "dotenv/config";
import { PrismaClient } from './generated/prisma'
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";

// Usa las variables
const port = Number(process.env.PORT) || 3000;

const app = express();
const prisma = new PrismaClient();


app.all("/api/auth/*splat", toNodeHandler(auth));


// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.get('/', async (req, res) => {
  const userCount = await prisma.user.count();
  res.json(
    userCount == 0
      ? "No users have been added yet."
      : "Some users have been added to the database."
  );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
