const express = require('express');

const createPdf = require('./create-pdf');
const createStreamyardLive = require('./create-streamyard-live');
const createStreamyardRecording = require('./create-streamyard-record');
const putRemarkable = require('./put-remarkable');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/create-pdf', createPdf);
router.use('/put-remarkable', putRemarkable);
router.use('/create-streamyard-live', createStreamyardLive);
router.use('/create-streamyard-record', createStreamyardRecording);

module.exports = router;
