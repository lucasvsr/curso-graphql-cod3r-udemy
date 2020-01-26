const { perfis } = require('../data/db')

module.exports = {

    salario(usuario) { //O atributo "salario_real" não bate com o type que definimos no Schema. Este método faz o bind.

            return usuario.salario_real

        },

        perfil(usuario) {

            let selecionado = perfis.filter(p => p.id == usuario.perfil_id)

            return selecionado ? selecionado[0] : null

        }

}