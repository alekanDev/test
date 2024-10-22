import mongoose from "mongoose"
import 'dotenv/config.js'

const URL_DB = process.env.URL_MONGO_SERVER

const DbConnection = (action) => {
  action ? 
  mongoose
  .connect(URL_DB)
  .then(data => {
    console.log('DB connection: true')
  })
  .catch(err => {
    console.log('DB connection: false', err)
  }) : 
  mongoose
  .disconnect()
  .then(data => {
    console.log('DB disconnected')
  })

}


export const DBConnect = (action) =>{ DbConnection(action)}
