module.exports = {

    precoComDesconto(produto) {

        return produto.desconto == null ? produto.preco : produto.preco * (1 - produto.desconto)
    }

}


        