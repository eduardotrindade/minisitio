const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/table_usuarios');
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const { forgotPasswordEmail } = require('../functions/sendMailer');

module.exports = {
    forgotPassword: async (req, res) => {
        const { email } = req.body;

        const user = await Usuario.findAll({ where: { descEmail: email } });
        //        console.log(user)


        if (!user)
            return res.status(404).json({ message: 'E-mail não encontrado.' });

        // Gera token seguro
        const token = crypto.randomBytes(32).toString('hex');
        const expiration = new Date(Date.now() + 3600000); // 1 hora

        // Atualiza o usuário
        /*       user.resetToken = token;
              user.resetTokenExpires = expiration;
              await user.save(); */

        await Usuario.update(
            {
                resetToken: token,
                resetTokenExpires: expiration
            },
            { where: { descEmail: email } }
        );


        // Link de redefinição
        const resetLink = `https://minitest.automaplay.com.br/reset-password?token=${token}`;


        const emailRecuperacao = await forgotPasswordEmail(user[0].descEmail, resetLink);

        res.json({ success: true, messagem: "enviado" });
    },
    resetPassword: async (req, res) => {
        const { token, password } = req.body;

        if (!token || !password)
            return res.status(400).json({ message: 'Token e nova senha são obrigatórios.' });

        try {
            const user = await Usuario.findOne({
                where: {
                    resetToken: token,
                    resetTokenExpires: {
                        [Op.gt]: new Date()
                    }
                },
                attributes: ['codUsuario', 'descEmail', 'senha', 'resetToken', 'resetTokenExpires']
            });

            if (!user) {
                return res.status(400).json({ message: 'Token inválido ou expirado.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await Usuario.update({
                senha: hashedPassword,
                resetToken: null,
                resetTokenExpires: null
            },
                { where: { descEmail: user.descEmail } }
            );

            res.status(200).json({ success: true, message: 'Senha atualizada com sucesso.' });

        } catch (err) {
            console.error('Erro ao redefinir senha');
            res.status(500).json({ message: 'Erro ao redefinir senha.' });
        }
    }
}