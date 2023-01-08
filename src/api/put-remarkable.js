const express = require('express');
const { remarkable } = require('rmapi-js');
const { webcrypto } = require('crypto');
const router = express.Router();

global.crypto = webcrypto;

router.post('/', async (req, res) => {
    const fileName = req.body.fileName;
    const parent = req.body.parent;
    const buffer = req.body.buffer;
    const api = await remarkable(process.env.RM_TOKEN);
    const entry = await api.putPdf(fileName, buffer, { parent: parent });
    const create = await api.create(entry);
    res.status(200).json({ 'message' : create });
});

module.exports = router;
