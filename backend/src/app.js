const express = require('express')
const router = require('./router')
const app = express()
const port = 3003

app.use(express.urlencoded({ extended: true }))

app.use(router)

module.exports = app
