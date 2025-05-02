const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')

app.get('/', (req, res) => {

    const user = {
        name: 'Victor',
        surname: 'Hugo',
        age: 23,
    }

    const time = 'Corinthians'

    const auth = true

    res.render('home', { user: user, time, auth })
})

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: "Aprender Node.js",
            category: "JavaScript",
            body: "Teste",
            commets: 5,
        },
        {
            title: "Aprender PHP",
            category: "PHP",
            body: "Teste",
            commets: 5,
        },
        {
            title: "Aprender Docker",
            category: "Docker",
            body: "Teste",
            commets: 5,
        },
    ]
    res.render('blog', {posts})
})

app.get('/dashboard', (req, res) => {

    const items = ["item a", "item b", "item c"]

    res.render('dashboard', { items })
})

app.get('/post', (req, res) => {

    const post = {
        title: "Aprender Node.js",
        category: "JavaScript",
        body: "Este artigo vai te ajudar a aprender Node.js",
        comments: 4,
    }

    res.render('blogpost', { post })
})

app.listen(3000, () => {
    console.log('app funcionando na porta 3000')
})