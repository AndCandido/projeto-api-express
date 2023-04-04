const express = require('express')
const router = require('./router')
const flash = require('connect-flash')
const session = require('express-session')
const cors = require('cors')
const app = express()
const port = 3003


app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(express.json())
app.use(cors())
app.use(flash())
app.use(router)

module.exports = app
