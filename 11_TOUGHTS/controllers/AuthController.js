const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static async login(req, res) {
        try {
            res.render('auth/login')
        } catch (error) {
            console.log(error)
        }
    }

    static async register(req, res) {
        try {
            res.render('auth/register')
        } catch (error) {
            console.log(error)
        }
    }

    static async registerPost(req, res) {
        try {
            console.log('POST /register', req.body)

            const { name, email, password, confirmpassword } = req.body

            // validação de senha
            if (password != confirmpassword) {
                req.flash('message', 'As senhas não conferem, tente novamente!')
                return res.render('auth/register')
            }

            // verificar se o usuário existe
            const checkUserExists = await User.findOne({ where: { email } })

            if (checkUserExists) {
                req.flash('message', 'Este e-mail já está em uso. Por favor, tente outro e-mail.')
                return res.render('auth/register')
            }

            // criar senha criptografada
            const salt = bcrypt.genSaltSync(20)
            const hashedPassword = bcrypt.hashSync(password, salt)

            const user = {
                name,
                email,
                password: hashedPassword
            }
            console.log('aqui')
            await User.create(user)

            req.session.userid = user.id
            console.log('Usuário cadastrado com sucesso:', user)
            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })

        } catch (error) {
            req.flash('message', 'Erro interno no servidor, tente novamente.')
            console.log(error)
            return res.redirect('/register')
        }
    }

}
