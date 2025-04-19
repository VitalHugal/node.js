const http = require("http");
const fs = require("fs");

const port = 3000;


const server = http.createServer((req, res) => {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {'content-type': 'text/html'})
        res.write(data)
        return res.end()
    })
})

server.listen(port, () => {
    console.log(`Servidor rondando na porta: ${port}`)
})