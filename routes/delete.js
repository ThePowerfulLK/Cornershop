const router = require('express').Router();
const deleteRoute = require('../controllers/delete');

router.delete('/deleteUser', deleteRoute.deleteUser);

module.exports = router;