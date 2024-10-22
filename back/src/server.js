import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config.js'
import { UserRoutes } from './routes/users/user_routes.js'
import { TicketRoutes } from './routes/tickets/ticket_routes.js'
import { DBConnect } from './db/mongo_connection.js'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT

export const Server = () => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  })
}
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))
app.use(UserRoutes)
app.use(TicketRoutes)