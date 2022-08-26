const db = require('../connect');

exports.deleteUser = async (req, res) => {
     try {

          const deleteQuery = `DELETE FROM users WHERE user_id = ${req.body.user_id}`;
          const deleteQueryResponse = await db.execute(deleteQuery);

          if (deleteQueryResponse.affectedRows > 0) {
               return res.status(200).send({
                    message: 'Usuario removido com sucesso',
                    status: 'sucess',
                    status_code: 'allOk'
               });
          } else {
               return res.status(500).send({
                    error: 'Erro ao remover usuario.',
                    status: 'error',
                    status_code: 'removeError'
               });
          };
     } catch (error) {
          console.log(error);
          return res.status(500).send({
               message: 'Ocorreu um erro. Entre em contato com o suporte.',
               status: 'error',
               status_code: 'APIerror'
          });
     }
}