const jwt = require('jwt-simple')
const { perfis: ObterPerfis } = require('../Type/Usuario')

module.exports = {

    async getUsuarioLogado(usuario) {

        let perfis = await ObterPerfis(usuario)
        let agora = Math.floor(Date.now() / 1000)

        let usuarioInfo = {

            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            perfis: perfis.map(p => p.nome),
            iat: agora,
            exp: agora + (3 * 24 * 60 * 60) // 3 dias

        }

        let authSecret = process.env.APP_AUTH_SECRET

        return {

            ...usuarioInfo,
            token: jwt.encode(usuarioInfo, authSecret)

        }

    }
}