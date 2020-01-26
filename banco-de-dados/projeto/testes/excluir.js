const db = require('../config/db')

// db('usuarios').where({ id: 1})
//     .delete()
//     .then(res => console.log(res))

db('perfis')
    .delete()
    .then(res => console.log(res))
    .finally(() => db.destroy())