const cardsRouter = require('./cards');
const router = require('express').Router();

router.use('/cards', cardsRouter);

module.exports = router;