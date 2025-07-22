import express from 'express';
import 'dotenv/config'
import userRoutes from "./routes/userRoutes";
import travelRoutes from "./routes/travelRoutes";
// import userRoutes from './routes/userRoutes';

const app = express();
// const router = express.Router();

app.use(express());
app.use(express.json());
// app.use('/api', userRoutes);

const PORT = process.env.PORT || 2929;

app.listen(PORT, () => {
    console.log(`server running and listening on "http://localhost:${process.env.PORT}"`);
})


app.use("/user", userRoutes);
app.use("/travel", travelRoutes);