var express = require('express');
var router = express.Router();
var passport = require('passport');
var MicrosoftStrategy = require('passport-microsoft').Strategy;
const scope = 'user.read,calendars.read'

router.get('/auth/microsoft', passport.authenticate('microsoft'));

router.get('/auth/microsoft/callback', passport.authenticate('microsoft', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.    
        console.log("here in callbak office 365 auth");
        req.session.user = req.user
        var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            user: req.user
        }));
        res.status(200).send(responseHTML);
    }
);


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var microsoftStrategy = new MicrosoftStrategy({
        clientID: 'acbe9f27-c9cc-4ae7-81f7-e8f5fc18d787',
        clientSecret: '9vO4GffjhWO_~dLY~E-GVR6UT9J1-yR6vC',
        callbackURL: process.env.callbackURL,
        scope: scope.split(',')
    },
    function(accessToken, refreshToken, profile, done) {
        profile.token = accessToken
        return done(null, profile);
    }
)

passport.use(microsoftStrategy);

module.exports = router;