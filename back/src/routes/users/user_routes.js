import express from 'express'
import { CreateUser, LoginController } from '../../controllers/users/user_controller.js'

export const UserRoutes = express.Router()

UserRoutes.post('/login', LoginController)
UserRoutes.post('/users/create_user', CreateUser)