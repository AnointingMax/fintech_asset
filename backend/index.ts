import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import 'dotenv/config'
import morgan from "morgan"
import cors from "cors"
import ErrorWithCode from "./utils/ErrorWithCode";
import { initializeStorage } from "./utils/storage";
import authRouter from "./routers/authRouter";
import transactionRouter from "./routers/transactionRouter";

const app = express();

initializeStorage()

app.use(cors({
	origin: [
		"http://localhost:3000",
		"http://localhost:3001",
		"http://localhost:3002",
		"http://localhost:5173",
	],
}));
app.use(express.json())
app.use(helmet());
app.use(morgan('dev'))

// routes
app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to Fintech Asset");
});

app.use("/auth", authRouter)
app.use("/transactions", transactionRouter)

app.use((error: ErrorWithCode, req: Request, res: Response, next: NextFunction): void => {
	console.log(error.message)
	res.status(error.errorCode ?? 500).json({ error: error.message })
})

app.all("*", (req, res) => {
	res.status(404).json({ error: "Route not found" })
})

// some more stuff

const APP_PORT = process.env.APP_PORT;

app.listen(APP_PORT, () => {
	console.log(`Server started on port ${APP_PORT}`);
});
