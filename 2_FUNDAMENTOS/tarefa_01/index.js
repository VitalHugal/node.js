const inquirer = require('inquirer');
const chalk = require('chalk');

const chalkYB = chalk.default.bgYellow.black; 

inquirer
  .prompt([
    {
      name: 'p1',
      message: 'Digite seu nome: ',
    },
    {
      name: 'p2',
      message: 'Digite sua idade: ',
    },
  ])
  .then((answers) => {
    console.log(chalkYB(`${answers.p1}`));
    console.log(chalkYB(`${answers.p2}`));
  })
  .catch((err) => console.log(`Erro: ${err}`));
