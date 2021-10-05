const path = require('path');
const express = require('express');
const bParser = require('body-parser');
//const expressHbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3000; // So we can run on heroku || (OR) localhost:3000

const errorController = require('./controllers/error');
//  app.engine('hbs', expressHbs({layoutsDir: 'practice/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
//  app.set('view engine', 'hbs');
app.set('view engine', 'ejs');
app.set('views', 'views');
//app.engine('pug', require('pug').__express)

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


app.listen(PORT, () => console.log(`Listening on ${PORT}`));