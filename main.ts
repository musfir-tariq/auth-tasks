import "reflect-metadata"
import express, { Request, Response } from "express"
import connection from "./src/db/connection"
import authRoutes from "./src/routes/auth.routes"
import taskRoutes from "./src/routes/tasks.routes"
import { DB } from "./src/config"

const app = express()

app.use(express.json())

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "Welcome" })
})

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

const startServer = async (): Promise<void> => {
  try {
    await connection.sync()
    app.listen(3000, () => {
      console.log("Server started on port 3000")
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

void startServer()
