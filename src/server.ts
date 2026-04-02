import "dotenv/config"
import express from "express"
import authRoutes from "./interfaces/routes/auth.routes"

const app = express()

app.use(express.json())

app.use("/auth", authRoutes)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})