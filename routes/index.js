const router = require('express').Router();

// import route for /notes
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;