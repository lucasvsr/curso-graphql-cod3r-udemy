const db = require('./db')
const { getUsuarioLogado } = require('../resolvers/comum/usuario')

const sql = `
    SELECT
        u.*
    FROM
        usuarios u,
        usuarios_perfis up,
        perfis p
    WHERE
        up.usuario_id = u.id
    AND
        up.perfil_id = p.id
    AND
        u.ativo = 1
    AND
        p.nome = :nomePerfil
    LIMIT 1
`

const getUsuario = async nomePerfil => {

    let res = await db.raw(sql, { nomePerfil })

    return res ? res[0][0] : null
}

module.exports = async req => {
    let usuario = await getUsuario('comum')

    if(usuario) {
        
        let { token } = await getUsuarioLogado(usuario)

        req.headers = {
            authorization: `Bearer ${token}`
        }
    }
}