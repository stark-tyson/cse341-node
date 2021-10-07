const path = require('path');

const express = require('express');
const bParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

const PORT = process.env.PORT || 3000; // So we can run on heroku || (OR) localhost:3000
 
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // userInfo.findById(1)
    //     .then(user => {
    //         req.user = new User(user.name, user.email, user.cart, user._id);
    //         next();
    //     })
    //     .catch(err => console.log(err));
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// const corsOptions = {
//     origin: "https://stark-cse341-bookapp42.herokuapp.com/",
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://Tyson:PlyPwIqfRkRHSZeJ@cse341cluster-3dwlw.mongodb.net/test?retryWrites=true&w=majority";


mongoConnect((client) => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
});

// mongoose
//   .connect(
//     MONGODB_URL, options
//   )
//   .then(result => {
//     app.listen(PORT, () => console.log(`Listening on ${PORT}`));
//   })
//   .catch(err => {
//     console.log(err);
//   });