const db = require('../../config/db')

module.exports = {
    async perfis() {
       
        return await db('perfis')

    },
    async perfil(_, { filtro }) {

        let { id = 0, nome = "" } = filtro

        if(id === 0 && nome === "") return null

        return await db('perfis')
                       .where({nome})
                       .orWhere({id}).first()

    }
}