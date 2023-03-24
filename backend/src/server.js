require('dotenv').config()
const app = require('./app')

const port = process.env.PORT || 3003

app.listen(port, () => console.log('Rodando em http://localhost:'+port))