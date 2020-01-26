const usuarios = [{
    id: 1,
    nome: "Lucas Ribeiro",
    email: "lucas@email.com",
    idade: 24,
    perfil_id: 1,
    status: 'ATIVO'
},{
    id: 2,
    nome: "Igor Ribeiro",
    email: "igor@email.com",
    idade: 24,
    perfil_id: 2,
    status: 'BLOQUEADO'
},{
    id: 3,
    nome: "Larissa Ribeiro",
    email: "larissa@email.com",
    idade: 21,
    perfil_id: 2,
    status: 'INATIVO'
}
]

const perfis = [{
    id: 1,
    nome: "Administrador"

}, {
    id: 2,
    nome: "Comum"

}]

module.exports = {usuarios, perfis}