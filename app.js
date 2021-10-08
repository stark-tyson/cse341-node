const path = require('path');
const PORT = process.env.PORT || 3000; // So we can run on heroku || (OR) localhost:3000

const express = require('express');
const bParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const errorController = require('./controllers/error');


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('6160ba831876f2d08fe37b60')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
    //next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

const corsOptions = {
    origin: "https://stark-cse341-bookapp42.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://Tyson:PlyPwIqfRkRHSZeJ@cluster0.2xac1.mongodb.net/shop?retryWrites=true&w=majority";


mongoose
    .connect(MONGODB_URL)
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Tyson',
                    email: 'tmoney@eeeemail.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    })
    .catch(err => {
        console.log(err);
    });