const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: "Primeira api" })
})

app.post('/createproduct', (req, res) => {
    const name = req.body.name
    const price = req.body.price

    console.log(name)
    console.log(price)

    res.send('Produto criado com sucesso') // resposta necessária
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})
