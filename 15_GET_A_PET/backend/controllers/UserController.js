const User = require('../models/User')


module.exports = class AuthController {

    static async register(req, res) {
        const { name, email, phone, password, confirmPassword } = req.body

        //validation
        if (!name || !email || !password || !confirmPassword) {
            return res.status(422).json({ message: "Campo obrigatório, verifique." })
        }

        return res.json({ message: "sucesso" })
    }

}
