let passport = require('passport');
let localStrategy = require('passport-local');
let mongoose = require('mongoose');
let User = mongoose.model('User');

passport.use(new localStrategy(
    {
        usernameField: 'email'
    },
    function (username, password, done) {
        User.findOne({email: username}, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, {
                    message: 'Неверный почтовый адрес'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Неправильный пароль'
                });
            }
            return done(null, user);
        });
    }
));