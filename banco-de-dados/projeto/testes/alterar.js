const db = require('../config/db')

const novoUsuario = {
    nome: 'Lucas',
    email: 'lucas@empresa.com.br',
    senha: '12345'
}

async function exercicio() {

    const { qtde } = await db('usuarios')
            .count('* as qtde').first()
    
    if (qtde === 0) {
        await db('usuarios').insert(novoUsuario)
    }
    
    let { id } = await db('usuarios').select('id').limit(1).first()

    await db('usuarios').where({ id }).update({ 
                                                nome: 'Lucas Ribeiro',
                                                email: 'lucasribeiro@empresa.com' })
    
    return await db('usuarios').where({ id })

}

exercicio()
    .then(usuario => console.log(usuario))
    .finally(() => db.destroy())