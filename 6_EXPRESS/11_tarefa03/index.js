const express = require('express')
const path = require('path')
const port = 3000

const app = express()

const basePath = path.join(__dirname, 'templates')

const pages = require('./pages')

app.use(express.json()) 

app.use(express.static('public'))

app.use('/pages', pages)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`)
})
