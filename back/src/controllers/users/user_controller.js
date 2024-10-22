import userSchema from '../../models/users/user_model.js'
import moment from 'moment'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { DBConnect } from '../../db/mongo_connection.js'
import { TokenValidator } from '../../utils/TokenValidator.js'

const SECRET_KEY = process.env.SECRET_JWT

const TokenGenerator = (username) => {
  const token = jwt.sign(username, SECRET_KEY, { expiresIn: '1h' })
  return token
}

const HashPassword = async (password) => {
  const saltRounds = 15
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}

const ValidatePassword = async (password, cryptPass) => {
  const decryptPass = await bcrypt.compare(password, cryptPass)
  return decryptPass
}

// TITULO: controlador logIn
export const LoginController = async (req, res) => {
  const { username, password } = req.body

  await DBConnect(true)

  const isUser = await userSchema.findOne({ username })

  if (!isUser) {
    return res.status(400).json({
      message: 'Usuario no encontrado'
    })
  }

  try {
    const correctPassword = await ValidatePassword(password, isUser.password)
    if (!correctPassword) {
      return res.status(400).json({
        message: 'Contraseña incorrecta'
      })
    }

    const DataToken = {
      username,
      full_name: `${isUser.first_name} ${isUser.last_name}`,
      rol: isUser.rol,
    }

    const current_token = await TokenGenerator(DataToken)

    res.cookie('token', current_token, {
      httpOnly: false,
      secure: false,
      sameSite: 'Strict'
    })

    res.status(200).json({
      message: 'Usuario validado correctamente',
      status: true
    })

  } catch (error) {
    res.status(500).json({
      message: 'Error iniciando Sesión',
      error
    })
  }
}

// TITULO: Creación de usuario
export const CreateUser = async (req, res) => {
  const { token } = req.headers

  const validation = await TokenValidator(token)

  if (!validation.status) {
    return res.status(401).json({
      message: validation.message
    })
  }

  try {
    const { id_user, username, password, email, entry_date, first_name, last_name, salary, rol } = req.body

    const userExist = await userSchema.findOne({ id_user })

    if (userExist) {
      return res.status(400).json({
        message: `Usuario con id: ${id_user} ya esta agregado`
      })
    }

    const newUser = new userSchema({
      id_user,
      username,
      password: await HashPassword(password),
      email,
      entry_date,
      first_name,
      last_name,
      salary,
      rol,
      creation_date: moment().format('YYYYMMDD_HH:mm:ss')
    })

    await newUser
      .save()
      .then(data => {
        res.status(201).json({
          message: 'Usuario guardado correctamente',
          data
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Error guardando Usuario',
          err
        })
      })
  } catch (error) {
    res.status(500).json({
      message: 'ServerError! - no se guardo el usuario'
    })
  }
}

// TITULO: Registro de usuarios
export const UserRegister = async (req, res) => {
}