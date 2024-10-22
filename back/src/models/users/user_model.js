import { Schema, model } from "mongoose"

const userSchema = new Schema({
  id_user: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  entry_date: {
    type: String,
    require: true
  },
  first_name: {
    type: String,
    require: true
  },
  last_name: {
    type: String,
    require: true
  },
  salary: {
    type: String,
    require: true
  },
  rol: {
    type: String,
    require: true
  }
})

export default model('users', userSchema)