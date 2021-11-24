const express = require('express');
const multer = require('multer');
const routes = express.Router();
const multerConfig = require('./config/multer');
const registerPost = require('./models/Post');

routes.post('/register', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, filename: key } = req.file;

    const register = await registerPost.create({
        name,
        size,
        key,
        url: "",
    })
    return res.json(register);
})


module.exports = routes;