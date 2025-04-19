// const x = '10'
const x = 10

//chegar se x é um numero

if (!Number.isInteger(x)) {
    throw new Error("o valor de x não é um número inteiro!")
}

console.log('Continue o código...')