const db = require('../../config/db')

module.exports = {
    async usuarios() {

        return await db('usuarios')

    },
    async usuario(_, { filtro }) {
        
        let {id = 0, email = ""} = filtro

        if(id === 0 && email === "") return null

        return await db('usuarios')
                       .where({ id })
                       .orWhere({ email })
                       .first()

    },
}