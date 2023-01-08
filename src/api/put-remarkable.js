const express = require('express');
const { remarkable } = require('rmapi-js');
const { webcrypto } = require('crypto');
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router();

global.crypto = webcrypto;


router.post('/', upload.single('pdf'), async (req, res) => {
    const name = req.file.originalname;
    const parent = req.headers.parent;
    const pdf = req.file.buffer;
    const api = await remarkable(process.env.RM_TOKEN);
    const entry = await api.putPdf(name, pdf, { parent: parent });
    const create = await api.create(entry);
    res.status(200).json({ 'message' : create });
});

module.exports = router;
