const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');
const errorRoutes = require('./error.js');

router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.use('/', errorRoutes);

module.exports = router;
