const express = require('express');
const multer = require('multer');
const routes = express.Router();
const multerConfig = require('./config/multer');

routes.post('/posts', multer(multerConfig).single('file'), (req, res) => {
    console.log(req.file);
    return res.json({ Hello: 'world' });
})


module.exports = routes;