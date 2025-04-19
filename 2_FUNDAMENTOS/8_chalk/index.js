import chalk from "chalk";

const nota = 2

if (nota >= 7) {
    console.log(chalk.green.bold('Parabéns você esta aprovado.'))
}else if(nota >= 3 && nota <= 6){
    console.log(chalk.gray.bold('Você esta de recuperação estude mais.'))
}else{
    console.log(chalk.red.bold('Você esta reprovado.'))

}
