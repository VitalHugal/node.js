const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())


app.set('view engine', 'handlebars')

app.get('/', (req, res) => {

    const user = {
        name: 'Victor',
        surname: 'Hugo',
        age: 23,
    }

    const time = 'Corinthians'

    const auth = false

    res.render('home', { user: user, time, auth })
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

app.listen(3000, () => {
    console.log('app funcionando na porta 3000')
})