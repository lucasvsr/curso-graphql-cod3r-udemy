const { usuarios, proximoIdUsuario } = require('../../data/db')

function indiceUsuario(filtro) {

    if(!filtro) return -1

    let { id, email } = filtro

    if(id) {return usuarios.findIndex(u => u.id === id)}

    if(email) {return usuarios.findIndex(u => u.email === email)}

    return -1
    
}


module.exports = {

    //{ nome, email, idade } - o ...args pega todos os valores enviados na requisicao
    novoUsuario(_, { dados }) {

        let emailExistente = usuarios
            .some(u => u.email === dados.email)

            if(emailExistente) {
                throw new Error('E-mail já cadastrado')
            }


        let novo = {
            id: proximoIdUsuario(),
            ...dados,
            perfil_id: 1,
            status: 'ATIVO'
        }

        usuarios.push(novo)

        return novo

    },

    excluirUsuario(_, { filtro }) {

        let i = indiceUsuario(filtro)

            if(i < 0) return null

        let excluidos = usuarios.splice(i, 1)

        return excluidos ? excluidos[0] : null

    },

    alterarUsuario(_, { filtro, dados }) {

        let i = indiceUsuario(filtro)

            if(i < 0) return null
        
        let usuario = {
            ...usuarios[i],
            ...filtro,
            ...dados
        }

        let alterados = usuarios.splice(i, 1, usuario)

        return usuario

    }
}