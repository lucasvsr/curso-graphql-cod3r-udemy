const db = require('../../config/db');
const { usuario: obterUsuario } = require('../Query/usuario');
const { perfil: obterPerfil } = require('../Query/perfil');

module.exports = {
	async novoUsuario(_, { dados }) {
		try {
			let idsPerfis = [];

			if (dados.perfis) {
				for (filtro of dados.perfis) {
					let perfil = await obterPerfil(_, { filtro });

					if (perfil) idsPerfis.push(perfil.id);
				}

				delete dados.perfis;
			}

			let [ id ] = await db('usuarios').insert(dados);

			for (idPerfil of idsPerfis) {
				await db('usuarios_perfis').insert({ usuario_id: id, perfil_id: idPerfil });
			}

			return await db('usuarios').where({ id }).first();
		} catch (error) {
			throw new Error(error.sqlMessage);
		}
	},
	async excluirUsuario(_, { filtro }) {
		try {
			let usuario = await obterUsuario(_, { filtro });

			if (usuario) {
				await db('usuarios_perfis').where({ usuario_id: usuario.id }).delete();

				await db('usuarios').where({ id: usuario.id }).delete();
			}

			return usuario;
		} catch (error) {
			throw new Error(error);
		}
	},
	async alterarUsuario(_, { filtro, dados }) {

		try {
			let usuario = await obterUsuario(_, { filtro });
			let idPerfis = [];

			if (usuario) {

				if (dados.perfis) {

                    await db('usuarios_perfis')
                            .where({ usuario_id: usuario.id })
                            .delete();

					for (filtro of dados.perfis) {

						let perfil = await obterPerfil(_, { filtro });

						if(perfil) await db('usuarios_perfis')
                                           .insert({ usuario_id: usuario.id,
                                                     perfil_id: perfil.id });
                    }

                    delete dados.perfis;
                    
				}

                await db('usuarios').where({ id: usuario.id }).update({ ...dados });

			}

            return !usuario ? null : { ...usuario, ...dados }
            
		} catch (error) {
			throw new Error(error.sqlMessage);
		}
	}
};
