import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db"
import cookieParser from "cookie-parser"
import authRouter from "./routes/userRoutes"
import sprintRouter from "./routes/sprintRoutes"
import evidenceRouter from "./routes/evidenceRoutes"
import skillsRouter from "./routes/skillsRoutes"
dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors(
    {
        origin:process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
))

app.use("/api/v1", authRouter)
app.use("api/v1", sprintRouter)
app.use("/api/v1",evidenceRouter)
app.use("/api/v1",skillsRouter)

app.get("/", (req, res) => {
    res.send("Healthy")
})

app.listen(4000, () => console.log("Backend running on 4000"))
