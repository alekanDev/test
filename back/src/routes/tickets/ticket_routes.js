import express from 'express'
import { AddTicket, DelTicket, GetTicket, GetTickets } from '../../controllers/tickets/ticket_controller.js'

export const TicketRoutes = express.Router()

TicketRoutes.post('/requisitions/add_ticket', AddTicket)
TicketRoutes.get('/requisitions/get_tickets', GetTickets)
TicketRoutes.get('/requisitions/get_ticket/:code', GetTicket)
TicketRoutes.delete('/requisitions/del_ticket/:code', DelTicket)