import express from express 
import dotenv from "dotenv"

dotenv.config()
let Port = process.env.Port || 4000

const app = express()

app.listen(Port ,()=>{
    console.log(`Port is runing on ${Port}`)
})