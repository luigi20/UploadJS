const express = require('express');
const multer = require('multer');
const routes = express.Router();
const multerConfig = require('./config/multer');
const registerPost = require('./models/Post');

routes.get('/posts', async (req, res) => {
    const posts = await registerPost.find();
    res.json(posts);
})

routes.post('/register', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, key, location: url = "" } = req.file;

    const register = await registerPost.create({
        name,
        size,
        key,
        url
    })
    return res.json(register);
})
routes.delete("/posts/:id", async (req, res) => {
    const post = await registerPost.findById(req.params.id);
    await post.remove();
    return res.send();
});


module.exports = routes;