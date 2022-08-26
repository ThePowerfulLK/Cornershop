const db = require('../connect');
const sha1 = require('sha1');
const crypto = require('crypto');

exports.createUser = async (req, res) => {
     try {
          const hashedPassword = sha1(req.body.pass).substring(5).slice(0, -5);
          const userToken = crypto.randomBytes(10).toString('hex')
          const createUserQuery = `INSERT INTO users
               (user_name, user_email, user_password, user_telephone, user_token)
               VALUES
               ('${req.body.name}', '${req.body.email}', '${hashedPassword}', '${req.body.telephone}', '${userToken}')`;
          const createUserQueryResponse = await db.execute(createUserQuery);
          if (createUserQueryResponse.affectedRows > 0) {
               return res.status(200).send({
                    message: 'Conta criada com sucesso.',
                    status: 'success',
                    status_code: 'allOK'
               });
          } else {
               return res.status(500).send({
                    message: 'Erro ao inserir dados.',
                    status: 'error',
                    status_code: 'creationError'
               });
          };
     } catch (error) {
          console.log(error);
          return res.status(500).send({
               message: 'Ocorreu um erro. Entre em contato com o suporte.',
               status: 'error',
               status_code: 'APIerror'
          });
     };
};