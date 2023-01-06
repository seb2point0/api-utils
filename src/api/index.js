const express = require('express');

const createPdf = require('./create-pdf');
const createStreamyard = require('./create-streamyard');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/create-pdf', createPdf);
router.use('/create-streamyard', createStreamyard);

module.exports = router;
