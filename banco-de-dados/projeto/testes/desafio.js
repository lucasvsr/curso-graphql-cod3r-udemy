const db = require('../config/db')

async function salvarUsuario(nome, email, senha) {

    let usuario = await db('usuarios')
                     .where({ email })
                     .first()
    
    
    if (!usuario) {
        
       let [ id ] = await db('usuarios')
                            .insert({ nome, email, senha })
        
        usuario = await db('usuarios')
                          .where({ id })
                          .first()

    } else {
        
        await db('usuarios')
                .where({ id: usuario.id })
                .update({ nome, email, senha })

        usuario = { ...usuario, nome, email, senha }
    }

    return usuario

}

async function salvarPerfil(nome, rotulo) {
    
    let perfil = await db('perfis')
                        .where({ nome })
                        .first()
    
    if (!perfil) {
        
       let [ id ] = await db('perfis')
                            .insert({ nome, rotulo })

        perfil = db('perfis')
                   .where({ id })
                   .first()

    } else {
        
        await db('perfis')
                .where({ id: perfil.id })
                .update({ nome, rotulo })

        perfil = {...perfil, nome, rotulo}

    }

    return perfil

}

async function adicionarPerfis(usuario, ...perfis) {

    for (perfil of perfis) {

        let teste = await db('usuarios_perfis')
                            .select('usuario_id')
                            .where({ usuario_id: usuario.id, perfil_id: perfil.id })
                            .first()
        
        if(!teste) {

            await db('usuarios_perfis')
                    .insert({usuario_id: usuario.id, perfil_id: perfil.id})
                
            console.log('Inseriu');

        }

    }
    
}

async function executar() {

    const usuario = await salvarUsuario('Igor Ribeiro', 'igor@empresa.com', '987456')
    const rh = await salvarPerfil('CON', 'Contabilidade')
    const fin = await salvarPerfil('COM', 'Compras')

    console.log(usuario);
    console.log(rh);
    console.log(fin);

    await adicionarPerfis(usuario, rh, fin)

}

executar()
         .catch(err => console.log(err))
         .finally(() => db.destroy())