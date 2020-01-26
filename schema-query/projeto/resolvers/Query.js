const { usuarios, perfis } = require('../data/db')

module.exports = {

    ola() {
        return 'Bom dia!'
    },

    horaCerta() {

        return new Date

    },

    usuarioLogado() {

        return {
            id: "65494521321",
            nome: "Lucas Ribeiro",
            email: "lucasvsribeiro1@gmail.com",
            idade: 24,
            salario_real: 1550.00,
            vip: true
        }

    },

    produtoEmDestaque() {

        return {
            nome: "Windows 10",
            preco: 2000,
            desconto: 0.50

        }

    },

    numerosMegaSena() {

        let crescente = (a, b) => a - b;

        return Array(6).fill(0)
                    .map(n => parseInt(Math.random() * 60 + 1))
                    .sort(crescente) 
    },

    usuarios() {

        return usuarios
    },

    usuario(_, { id }) {
        
        let selecionados = usuarios.filter(u => u.id == id)

        return selecionados ? selecionados[0] : null

    },

    perfis() {

        return perfis

    },

    perfil(_, { id }) {
        
        let selecionados = perfis.filter(p => p.id == id)

        return selecionados ? selecionados[0] : null
    }

}


    
