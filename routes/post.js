const router = require('express').Router();
const postRoute = require('../controllers/post');

router.post('/createUser', postRoute.createUser)

module.exports = router;