const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const hbars = require('express-handlebars');
const path = require('path');
const db = require('./database');

const app = express();

//settings
const port = process.env.PORT || 4000
require('dotenv').config();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.engine('.hbs', hbars({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: 'hbs',
}));

//midlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + path.extname(file.originalname));
  }
});
app.use(multer({ storage }).single('image'));

//Routes
app.use(require('./routes/imageRouter.js'));

app.listen(port, () => {
  console.log("servidor listening en el puerto: ", port);
});










