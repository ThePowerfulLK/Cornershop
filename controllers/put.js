const db = require('../connect');
const sha1 = require('sha1');

exports.editUser = async (req, res) => {
     try {
          const getUserPassword = `SELECT *
               FROM users
               WHERE user_token = ${req.body.token}`;
          const getUserPasswordResponse = await db.execute(getUserPassword);
          if (getUserPasswordResponse.length == 0) {
               return res.status(500).send({
                    message: 'Nenhum usuário encontrado.',
                    status: 'error',
                    status_code: 'wrongToken'
               });
          };
          const currentPasswordHashed = sha1(req.body.password).substring(5).slice(0, -5);
          let newPasswordHashed = "";
          if (currentPasswordHashed == getUserPasswordResponse[0].user_password) {
               newPasswordHashed = sha1(req.body.newPassword).substring(5).slice(0, -5);
          };
          const backupData = {
               name: getUserPasswordResponse[0].user_name,
               email: getUserPasswordResponse[0].user_email,
               oldPassword: getUserPasswordResponse[0].user_password,
               telephone: getUserPasswordResponse[0].user_telephone
          };
          const editedUser = {
               name: req.body.name,
               email: req.body.email,
               newPassword: newPasswordHashed,
               telephone: req.body.telephone
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