const express = require('express');
const { remarkable } = require('rmapi-js');
const { webcrypto } = require('crypto');

const router = express.Router();

global.crypto = webcrypto;

router.post('/', async (req, res) => {
    const file = req.headers.name;
    const parent = req.headers.parent;
    const pdf = req.body.pdf;
    const api = await remarkable(process.env.RM_TOKEN);
    const entry = await api.putPdf(fileName, pdf, { parent: parent });
    const create = await api.create(entry);
    res.status(200).json({ 'message' : create });
});

module.exports = router;
