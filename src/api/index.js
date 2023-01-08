const express = require('express');

const createPdf = require('./create-pdf');
const createStreamyard = require('./create-streamyard');
const putRemarkable = require('./put-remarkable');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/create-pdf', createPdf);
router.use('/create-streamyard', createStreamyard);
router.use('/put-remarkable', putRemarkable);

module.exports = router;
