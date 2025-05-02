const express = require('express')
const exphbs = require('express-handlebars') 

const app = express()   

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')

app.get('/', (req, res) => {

    const produtos = [
        {
            name: "mouse",
            preco: "R$35,00",
        },
        {
            name: "teclado",
            preco: "R$50,00",
        },
    ]
    res.render('produtos', {produtos})
})



app.use(express.static('public'))

app.get('/mouse', (req, res) => {
    
    res.render('mouse')
});
app.get('/teclado', (req, res) => {

    res.render('teclado')
});

app.listen(3000, () => {
    console.log('app funcionando na porta 3000')
})