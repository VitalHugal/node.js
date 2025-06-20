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

    console.log(name)
    console.log(price)
    return res.json({ success: true, message: "ok" })
})

app.get('/', (req, res) => {
    res.json({ message: "Primeira api" })
})

app.listen(3000)