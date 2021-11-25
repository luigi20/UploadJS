require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const routes = require('./routes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
app.use(routes);

app.listen(3333);

