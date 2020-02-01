module.exports = async ({ req }) => {

    //Teste em ambiente de desenvolvimento
    await require('./simularUsuarioLogado.js')(req)

    const auth = req.headers.authorization
    
    
}