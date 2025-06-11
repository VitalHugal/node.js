const Thought = require('../models/Thought')
const User = require('../models/User')

const { Op, fn, col, where, or } = require('sequelize');

module.exports = class ThoughtController {

    static async showThoughts(req, res) {
        try {

            let search = req.query.search || '';

            console.log("SEARCH TERM:", search);

            let order = 'DESC'

            if (req.query.order === 'old') {
                order = 'ASC'
            } else {
                order = 'DESC'
            }

            const thoughtData = await Thought.findAll({
                include: User,
                where: {
                    title: where(fn('LOWER', col('title')), {
                        [Op.like]: `%${search.toLowerCase()}%`
                    })
                },
                order: [['createdAt', order]],
                raw: true,
                nest: true
            });

            let thoughtQTD = thoughtData.length

            if (thoughtQTD === 0) {
                thoughtQTD = false
            }

            res.render('thoughts/home', { thoughts: thoughtData, search, thoughtQTD });
        } catch (error) {
            console.error('Erro ao buscar pensamentos:', error);
            res.status(500).send('Erro ao buscar pensamentos');
        }
    }

    static async dashboard(req, res) {

        const userId = req.session.userid;

        const user = await User.findOne({
            where: { id: userId },
            include: Thought,
            plain: true,
        });

        if (!user) {
            res.redirect('/login')
        }

        const thoughts = user.Thoughts.map((result) => result.dataValues)

        let emptyThoughts = false

        if (thoughts.length === 0) {
            emptyThoughts = true
        }

        console.log(thoughts)

        res.render('thoughts/dashboard', { thoughts, emptyThoughts })
    }

    static async createThoughts(req, res) {
        res.render('thoughts/create')
    }

    static async createThoughtsSave(req, res) {
        try {
            const thought = {
                title: req.body.title,
                UserId: req.session.userid
            }

            await Thought.create(thought)

            req.flash('message', "Pensamento criado com sucesso")
            req.session.save(() => {
                res.redirect('/thoughts/dashboard')
            })
        } catch (error) {
            console.log("Ops!, algo inesperado aconteceu " + error)
        }
    }

    static async removeThoughts(req, res) {

        try {
            const UserId = req.session.userid
            const id = req.body.id

            await Thought.destroy({ where: { id: id, UserId: UserId } })

            req.flash('message', "Pensamento removido com sucesso")
            req.session.save(() => {
                res.redirect('/thoughts/dashboard')
            })

        } catch (error) {
            console.log(error)
        }
    }

    static async updateThoughts(req, res) {
        try {
            const id = req.params.id
            const thought = await Thought.findOne({
                where: { id: id },
                raw: true,
            })

            res.render('thoughts/edit', { thought })
        } catch (error) {
            console.log(error)
        }
    }

    static async updateThoughtsSave(req, res) {
        try {
            const id = req.body.id; // ✅ correto
            const title = req.body.title;

            await Thought.update(
                { title },
                { where: { id: id } }
            );

            req.flash('message', 'Pensamento atualizado com sucesso!');
            req.session.save(() => {
                res.redirect('/thoughts/dashboard');
            });
        } catch (err) {
            console.log("Erro ao atualizar o pensamento:", err);
        }
    }

}
