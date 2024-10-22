import { Schema, model } from "mongoose"

const ticketSchema = new Schema({
  id_ticket: {
    type: String,
    require: true
  },
  code: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  sumary: {
    type: String,
    require: true
  },
  id_user: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  added_by: {
    type: String,
    require: true
  }
})

export default model('tickets', ticketSchema)