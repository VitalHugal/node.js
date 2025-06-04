const Thought = require('../models/Thought')
const User = require('../models/User')

module.exports = class ThoughtController {

    static async showThoughts(req, res) {
        try {
            // res.send('thoughts/home')
            res.render('thoughts/home')
        } catch (err) {
            console.log(err);
            return res.status(500).send('Erro ao carregar a página');
        }
    }

}
