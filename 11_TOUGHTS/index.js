const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

//models
const Tought = require('./models/Thought')
const User = require('./models/User')

//routes
const thoughtsRoutes = require('./routes/thoughtsRoutes')
const authRoutes = require('./routes/authRoutes')

//controller 
const ThoughtController = require('./controllers/ThoughtsController')

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(
    express.json()
)

//session middleware
// app.use(session({
//     name: 'session',
//     secret: 'nosso_secret',
//     resave: false,
//     saveUninitialized: false,
//     store: new FileStore({
//         logFn: function () { },
//         path: require('path').join(require('os').tmpdir(), 'sessions'),
//     }),
//     cookie: {
//         secure: false,
//         maxAge: 360000,
//         expires: new Date(Date.now() + 360000),
//         httpOnly: true
//     }
// })
// )

app.use(
    session({
        name: 'sessionId',
        secret: 'seuSegredo',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            path: require('os').tmpdir() + '/sessions', // caminho seguro
            retries: 0, // evita tentativas de regravação
            logFn: function () { } // desliga logs
        }),
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 // 1 dia
        }
    })
)

// flash 
app.use(flash())

//public path
app.use(express.static('public'))

//set session to res
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

//routes
app.use('/thoughts', thoughtsRoutes);
app.use('/', authRoutes);
app.use('/', thoughtsRoutes);

conn
    .sync()
    // .sync({ force: true })
    .then(() =>
        app.listen(3000)
    )
    .catch((err) =>
        console.log(err)
    )