//Se cada pasta referenciada aqui tiver um index.js ele descobre automáticamente
const Query = require('./Query')
const Usuario = require('./Query/Usuario-perfil')
const Mutation = require('./Mutation')

module.exports = {
    Query,
    Usuario,
    Mutation
}