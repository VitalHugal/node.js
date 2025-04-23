//modulos externos
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs'
import { encode } from 'punycode';
import { get } from 'https';

console.log('Iniciamos o account')

operation();

function operation() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Oque você deseja fazer ?',
            choices: [
                'Criar conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair',
            ],
        },
    ]).then((answer) => {
        const action = answer['action']

        if (action === 'Criar conta') {
            createaccount()
        } else if (action === 'Depositar') {
            deposit()
        } else if (action === 'Consultar saldo') {
            consultAccount()
        } else if (action === 'Sacar') {
            withdraw()
        } else if (action === 'Sair') {
            console.log(chalk.bgBlue.black('Obrigado por usar o ACCOUNT'))

            process.exit();
        }
    })
        .catch((err) => console.log(err))
}

//crete account
function createaccount() {
    console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco"))
    console.log(chalk.green('Defina as opções da sua conta'))

    buildAccount()
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: "Digite o nome para sua conta"
        }
    ]).then((answer) => {
        const accountName = answer['accountName'];

        console.info(accountName)

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Ja existe uma conta com esse nome. Por favor, verifique.'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function (err) {
            console.log(err)
        },
        )

        console.log(chalk.green('Conta criada com sucesso.'));
        operation();

    }).catch((err) => console.log(err))
}

//add an amount to user account
function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: "Qual o nome da sua conta"
        }
    ]).then((answer) => {

        const accountName = answer['accountName'];

        if (!checkAccount(accountName)) {
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar',
            }
        ]).then((answer) => {

            const amount = answer['amount'];
            addAmount(accountName, amount)
            operation()

        }).catch(err => console.log(err))

    }).catch(err => console.log(err))
}

function checkAccount(accountName) {

    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false;
    }

    return true;
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ops! algo de errado aconteceu tente novamente mais tarde.'))

        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount},00 reais.`))
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

function consultAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual conta você deseja ver o saldo ?'
        }
    ]).then((answer) => {
        const account = answer['accountName'];

        if (!checkAccount(account)) {
            return consultAccount()
        }

        const info = getAccount(account)

        console.log(chalk.bgBlue.black(`O saldo atual é de R${info.balance},00`))
        operation()
    }).catch(err => console.log(err))
}

function withdraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'De qual conta você deseja realizar o saque ?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if (!checkAccount(accountName)) {
            return withdraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Qual é o valor para saque ?'
            }
        ]).then((answer) => {
            const amount = answer['amount'];

            sake(accountName, amount)

        }).catch(err => console.log(err))


    }).catch(err => console.log(err))
}

function sake(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ops! algo de errado aconteceu tente novamente mais tarde.'))

        return withdraw()
    }

    if (parseFloat(accountData.balance) >= parseFloat(amount)) {
        accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

        fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData),
            function (err) {
                console.log(err)
            },
        )

        console.log(chalk.green(`Foi retirado o valor de R$${amount},00.`))
        operation()
    } else {
        console.log(chalk.bgRed.black('O valor solicitado para saque é maior que o valor em conta. Por favor, verifique'))
        withdraw()
    }

}