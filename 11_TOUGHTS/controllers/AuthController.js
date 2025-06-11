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

    static async loginPost(req, res) {
        try {
            const { email, password } = req.body;

            const checkUserExists = await User.findOne({
                where: { email },
                attributes: ['id', 'email', 'password']
            });

            if (!checkUserExists) {
                req.flash('message', 'Usuário não encontrado.');
                return res.render('auth/login');
            }

            if (!checkUserExists.password) {
                req.flash('message', 'Erro: senha não encontrada no usuário.');
                return res.render('auth/login');
            }

            const passCheck = bcrypt.compareSync(password, checkUserExists.password);

            if (!passCheck) {
                req.flash('message', 'Senha inválida.');
                return res.render('auth/login');
            }

            req.session.userid = checkUserExists.id;
            req.flash('message', 'Auntenticação realizada com sucesso.');

            req.session.save(() => {
                res.redirect('/')
            })

        } catch (error) {
            console.log(error);
            res.status(500).send('Erro interno no servidor');
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

            if (password !== confirmpassword) {
                req.flash('message', 'As senhas não conferem, tente novamente!')
                return res.render('auth/register')
            }

            const checkUserExists = await User.findOne({ where: { email } })

            if (checkUserExists) {
                req.flash('message', 'Este e-mail já está em uso. Por favor, tente outro e-mail.')
                return res.render('auth/register')
            }

            const salt = bcrypt.genSaltSync(10) // ⚠️ 10 é suficiente
            const hashedPassword = bcrypt.hashSync(password, salt)

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword
            })

            req.flash('message', 'Cadastro realizado com sucesso!')
            req.session.userid = newUser.id

            // Redireciona direto para evitar lentidão do session.save()
            req.session.save(() => {
                res.redirect('/')
            })

        } catch (error) {
            console.error('Erro no registerPost:', error)
            req.flash('message', 'Erro interno no servidor, tente novamente.')
            return res.redirect('/register')
        }
    }

    static async logout(req, res) {
        try {
            req.session.destroy();
            res.redirect('/login');
        } catch (error) {
            console.log(error)
        }
    }

}
