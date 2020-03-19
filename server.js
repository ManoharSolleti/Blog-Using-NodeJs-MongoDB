const express = require('express');
const articleRouter = require('./routes/article');
const mongoose = require('mongoose');
const Article = require('./models/article');
const methodOverride = require('method-override');

const app = express();

mongoose.connect(
  'mongodb+srv://<user>:<password>@cluster0-rtpi7.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  () => {
    console.log('database connected.');
  }
);

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });
  res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);

app.listen(process.env.PORT || 3000);
