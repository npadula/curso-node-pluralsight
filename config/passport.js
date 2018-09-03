const passport = require("passport");
require("./strategies/local.strategy")();

module.exports = function(app){
    app.use(passport.initialize());
    app.use(passport.session());
    
    //Store user in session
    passport.serializeUser((user,done) => {
        done(null,user); //First parameter is error
    });

    //Retrieve user from session
    passport.deserializeUser((user,done) => {
        done(null,user); //First parameter is error
    });


    
};