import express from 'express';
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import mainRouter from "./route/web"
import friendRouter from "./route/friend"
import postRouter from './route/post'
import authRouter from './route/auth'
import connectDB from "./config/connectDB"
require('dotenv').config()

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}))
app.use("/",friendRouter)
app.use("/",postRouter)
app.use("/",authRouter)

viewEngine(app)
// connectDB()

const port = process.env.PORT || 8000

app.listen(port)

