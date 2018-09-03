const passport = require("passport");
const {Strategy} = require("passport-local");


module.exports = function localStrategy(){
    passport.use(new Strategy(
        {
            usernameField:"username",
            passwordField: "password"
        },
        (username, password, done) => {
            //Maybe Fetch user from DB
            const usr = {
                username,password
            };

            done(null, usr);
        }
    ));

};