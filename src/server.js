import express from 'express';
import bodyParser from "body-parser"
import { Sequelize } from 'sequelize';
import viewEngine from "./config/viewEngine"
import mainRouter from "./route/web"
import friendRouter from "./route/friend"
import postRouter from './route/post'
import authRouter from './route/auth'
import db from './models/index';
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}))
app.use("/",friendRouter)
app.use("/",postRouter)
app.use("/",authRouter)

viewEngine(app)

const port = process.env.PORT || 8000

app.listen(port)

