import "dotenv/config"
import express from "express"
import authRoutes from "./interfaces/routes/auth.routes"
import { apiReference } from "@scalar/express-api-reference"
import { openApiSpec } from "./docs/openapi"

const app = express()

app.use(express.json())

app.use("/auth", authRoutes)

const PORT = 3000

app.get("/openapi.json", (req, res) => {
  res.json(openApiSpec)
})

app.use(express.static('public'))

app.use(
  "/docs",
  apiReference({
    theme: "moon",     
    url: "/openapi.json",
    pageTitle: "Sésamo API Docs",
    favicon: '/logo.png'
  })
)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})