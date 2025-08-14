import express from "express";
import 'dotenv/config'
import cors from "cors";
import { connectdb } from "./config/connectDB.js";
import aiRouter from "./routes/aiRoutes.js";
import listingRouter from "./routes/listingRouter.js";
import userRouter from "./routes/userRouter.js";
import feedbackRouter from "./routes/feedbackRouter.js";

const app = express()
const PORT = process.env.PORT || 4000


app.use(express.json())
app.use(cors())

app.use("/ai", aiRouter);
app.use("/jobs", listingRouter);
app.use("/user", userRouter);
app.use("/feedback", feedbackRouter);


connectdb().then(() => {
    app.listen(PORT, () => {
        console.log("Backend Server Running on localhost PORT:",PORT);
    })
})
