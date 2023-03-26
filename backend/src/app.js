const express = require('express')
const router = require('./router')
const flash = require('connect-flash')
const session = require('express-session')
const cors = require('cors')
const path = require('path')
const app = express()
const port = 3003


app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(express.static(path.resolve('..', 'frontend')))
app.use(express.json())
app.use(cors())
app.use(flash())
app.use(router)

module.exports = app
