import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { router } from "./route/route.js";

const app = express();
const PORT = 3000;

const corsOptions = {
	origin: "http://localhost:5173",
	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
	console.log(`Server online http://localhost:${PORT}`);
});
