const express = require('express')

const cors = require('cors')

const app = express()

//config JOSN response
app.use(express.json())

//solve cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

//public folde images
app.use(express.static('public'))

//routes
const UserRoutes = require('./routes/UserRoutes')

app.use('/users', UserRoutes)

app.listen(3000)