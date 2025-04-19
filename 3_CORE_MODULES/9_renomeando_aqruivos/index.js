const fs = require('fs');

fs.rename('arquivo.txt', 'novoNome.txt', function(err) {
    if (err) {
        console.log(err)
        return
    }

    console.log('Nome do arquivo alterado com sucesso.')
})