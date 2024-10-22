import jwt from 'jsonwebtoken'
import 'dotenv/config.js'

import { DBConnect } from '../db/mongo_connection.js'

const SECRET_KEY = process.env.SECRET_JWT

export const TokenValidator = (token) => {
  try {
    const infoUser = jwt.verify(token, SECRET_KEY)
    DBConnect(true)
    // if (infoUser.rol !== 'admin') {
    //   return ({
    //     status: false,
    //     message: 'Acción NO Autorizado'
    //   })
    // }
    return ({
      status: true,
      isUser: infoUser
    })

  } catch (error) {
    console.log(error)
    if (error instanceof jwt.TokenExpiredError) {
      console.log('Token expirado')
      return ({
        status: false,
        message: 'Token expirado'
      })
    }
    else if (error instanceof jwt.JsonWebTokenError) {
      console.log('Token no valido')
      return ({
        status: false,
        message: 'Error de Autenticación'
      })
    }
  }
}