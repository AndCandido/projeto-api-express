const express = require('express')
const router = require('./router')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()
const port = 3003

app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(flash())
app.use(router)

module.exports = app
