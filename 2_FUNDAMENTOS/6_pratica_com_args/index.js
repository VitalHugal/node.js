import soma from './soma.mjs'

import minimist from 'minimist'
//externo
const args = minimist(process.argv.slice(2))

//interno
// soma(2,9)

const a = parseInt(args['a'])
const b = parseInt(args['b'])

soma(a, b)