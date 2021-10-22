const path = require('path');
const PORT = process.env.PORT || 3000; // So we can run on heroku || (OR) localhost:3000
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://Tyson:gO9pGhRPLurbqTdy@cluster0.2xac1.mongodb.net/shop?retryWrites=true&w=majority";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const cors = require('cors');
const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use(csrfProtection);
app.use(flash());

app.use((req,res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            throw new Error(err);
        });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
    res.redirect('/500');
});

const corsOptions = {
    origin: "https://stark-cse341-bookapp42.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

mongoose
    .connect(MONGODB_URL)
    .then(result => {
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    })
    .catch (err => {
    console.log(err);
});