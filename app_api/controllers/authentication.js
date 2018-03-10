var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {
    console.log("___");
    if(!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            message: 'Все поля обязательны'
        });
        return;
    }

    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;

    console.log("___>");


    console.log('PASS_1: ', req.body.password);

    user.setPassword(req.body.password);

    console.log('PASS_2: ', req.body.password);

    user.save(function(err) {
        console.log("___2");
        var token;
        if(err) {
            console.log(">");
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token": token
            });
        }
    });
};

module.exports.login = function(req, res) {
    if(!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            message: 'Все поля обязательны'
        });
        return;
    }

    passport.authenticate('local', function(err, user, info) {
        var token;
        if(err) {
            console.log("!", err);
            sendJSONresponse(res, 404, err);
            return;
        }
        if(user) {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token": token
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);
};