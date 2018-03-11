let passport = require('passport');
let mongoose = require('mongoose');
let User = mongoose.model('User');

let sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {

    if(!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            message: 'Все поля обязательны'
        });
        return;
    }

    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function(err) {
        let token;
        if(err) {
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
        let token;
        if(err) {
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