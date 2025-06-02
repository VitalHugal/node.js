const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const User = require('./models/User')
const Address = require('./models/Address')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.get('/', function (req, res) {
  User.findAll({ raw: true })
    .then((users) => {
      console.log(users)
      res.render('home', { users: users })
    })
    .catch((err) => console.log(err))
})

app.post('/address/create', async (req, res) => {
  const { UserId, street, number, city } = req.body;

  try {
    await Address.create({
      UserId,
      street,
      number,
      city,
    });

    res.redirect('/');
  } catch (error) {
    console.error(error);
    console.error('Erro ao criar endereço:', error);
    res.status(500).send('Erro ao criar endereço');
  }
});

app.post('/users/update', async (req, res) => {

  const id = parseInt(req.body.id);
  const { name, occupation, newsletter } = req.body;

  const updatedUser = {
    name,
    occupation,
    newsletter: newsletter === 'on', // já retorna booleano
  };

  try {
    await User.update(updatedUser, { where: { id } });
    res.redirect('/');
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).send('Erro ao atualizar usuário');
  }
});


app.get('/users/create', function (req, res) {
  res.render('adduser')
})

app.post('/users/create', function (req, res) {
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if (newsletter === 'on') {
    newsletter = true
  }

  User.create({ name, occupation, newsletter })
    .then(res.redirect('/'))
    .catch((err) => console.log(err))
})

app.get('/users/:id', function (req, res) {
  const id = req.params.id

  User.findOne({
    raw: true,
    where: {
      id: id,
    },
  })
    .then((user) => {
      console.log(user)
      res.render('userview', { user })
    })
    .catch((err) => console.log(err))
})

app.post('/users/delete/:id', function (req, res) {
  const id = req.params.id

  User.destroy({
    where: {
      id: id,
    },
  })
    .then((user) => {
      res.redirect('/')
    })
    .catch((err) => console.log(err))
})

app.get('/users/edit/:id', function (req, res) {
  const id = req.params.id

  User.findOne({
    raw: true,
    where: {
      id: id,
    },
  })
    .then((user) => {
      console.log(user)
      res.render('useredit', { user })
    })
    .catch((err) => console.log(err))
})

// Criar tabelas e rodar o app
conn
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
