// Importação de bibliotecas e dependências do servidor
const mysql = require('mysql2');

var pool = mysql.createPool({
     "multipleStatements": true,
     "connectionLimit": 1000,
     "user": "root",
     "password": "",
     "database": "cornershop_clone",
     "host": "localhost",
     "port": "3306",
});

exports.execute = (query) => {
     return new Promise((resolve, reject) => {
          pool.query(query, (error, result) => {
               if (error) {
                    reject(error);
               } else {
                    resolve(result)
               }
          });
     })
}

exports.pool = pool;