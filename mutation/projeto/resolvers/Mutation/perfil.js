const { perfis, proximoIdPerfil } = require('../../data/db')

function indicePerfil(filtro) {

    if(!filtro) return -1

    let { id, nome } = filtro

    if(id) {return perfis.findIndex(p => p.id === id)}

    if(nome) {return perfis.findIndex(p => p.nome === nome)}

    return -1
    
}

module.exports = {

    novoPerfil(_, { dados }) {

        if(perfis.some(p => p.nome === dados.nome))
            throw new Error('Perfil já existente')
        
        let novo = {
            id: proximoIdPerfil(),
            ...dados
        }

        perfis.push(novo)

        return novo
    },

    excluirPerfil(_, { filtro }) {

        let i = indicePerfil(filtro)

            if(i < 0) return null

        let excluidos = perfis.splice(i, 1)

        return excluidos ? excluidos[0] : null
    },

    alterarPerfil(_, { filtro, dados }) {

        let i = indicePerfil(filtro)

            if(i < 0) return null
        
        let perfil = {
            ...filtro,
            ...dados
        }

        let alterados = perfis.splice(i, 1, perfil)

        return perfil

    }
}