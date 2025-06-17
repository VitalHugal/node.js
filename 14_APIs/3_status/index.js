const express = require('express')

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.post('/createproduct', (req, res) => {
    const name = req.body.name
    const price = req.body.price

    if (!name) {
       return res.status(422).json({message: "campo name é obrigatorio"})
    }

    console.log(name)
    console.log(price)
    return res.status(201).json({ success: true, message: "ok" })
})

app.get('/', (req, res) => {
    res.status(200).json({ message: "Primeira api" })
})

app.listen(3000)