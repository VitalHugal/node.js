const http = require("http")

const port = 3000


const server = http.createServer((req, res) => {
    res.write('Oi pessoal')

    res.end()
})

server.listen(port, () =>{
    console.log(`Servidor rondando na porta: ${port}`)
})