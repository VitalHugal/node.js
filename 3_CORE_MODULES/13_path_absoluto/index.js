const path = require('path')

const customPath = 'victor/pessoal/cv.pdf'


console.log(path.resolve('a.txt'))

const midFolder = 'relatorio'
const filename = 'victor.cv'

const finalPath = path.join('/' , 'arquivos', midFolder, filename)


console.log(finalPath)