import short from 'short-uuid'
import moment from 'moment/moment.js'
import ticketSchema from '../../models/tickets/ticket_model.js'
import { TokenValidator } from '../../utils/TokenValidator.js'

// TITULO: Inserción de Solicitud
export const AddTicket = async (req, res) => {
  const { token } = req.cookies

  const validation = await TokenValidator(token)

  if (!validation.status) {
    return res.status(401).json({
      message: validation.message
    })
  }

  try {
    const { code, description, sumary, id_user, added_by } = req.body

    const ticketExist = await ticketSchema.findOne({ code })

    if (ticketExist) {
      return res.status(400).json({
        message: `Ticket existente con el código: ${code}`
      })
    }

    const new_ticket = new ticketSchema({
      id_ticket: short.generate(),
      code,
      description,
      sumary,
      id_user,
      added_by,
      date: moment().format('YYYYMMDD_HH:mm:ss')
    })

    await new_ticket
      .save()
      .then(data => {
        res.status(201).json({
          message: 'Solicitud agregada con Exito'
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Error almacenando la solicitud',
          err
        })
      })

  } catch (error) {
    res.status(500).json({
      message: 'Error agregando la solicitud',
      error
    })
  }
}

// TITULO: Consulta de solicitudes
export const GetTickets = async (req, res) => {
  const { token } = req.cookies

  const validation = await TokenValidator(token)
  console.log(validation)

  if (!validation.status) {
    return res.status(401).json({
      message: validation.message
    })
  }

  try {
    await ticketSchema
      .find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(400).json({
          message: 'Error buscando solicitudes',
          err
        })
      })

  } catch (error) {
    res.status(500).json({
      message: 'Error cargando las solicitudes'
    })
  }
}

// TITULO: Busqueda por solicitud individual
export const GetTicket = async (req, res) => {
  const { token } = req.headers
  const { code } = req.params
  console.log(code)

  const validation = await TokenValidator(token)

  if (!validation.status) {
    return res.status(401).json({
      message: validation.message
    })
  }

  try {
    await ticketSchema
      .findOne({ code })
      .then(data => {
        res.status(200).json({
          message: 'Informacion alcanzada',
          data
        })
      })

  } catch (error) {
    res.status(500).json({
      message: 'ServerError: Error obteniendo Ticket'
    })
  }
}

//TITULO: Eliminacion de solicitud
export const DelTicket = async (req, res) => {
  const { token } = req.cookies
  const { code } = req.params
  const validation = await TokenValidator(token)

  if(!validation.status){
    return res.status(401).json({
      message: validation.message
    })
  }
  try {
    await ticketSchema
    .findOneAndDelete({code})
    .then(data => {
      res.status(200).json({
        message: 'Solicitud eliminada'
      })
    })
    .catch(err => {
      res.status(401).json({
        message: 'Error eliminando Solicitud',
        err
      })
    })
    
  } catch (error) {
    res.status(500).json({
      message: 'ServerError: Error Eliminando solicitud'
    })
  }
}