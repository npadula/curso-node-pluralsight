const passport = require("passport");
const {Strategy} = require("passport-local");
const {MongoClient} = require("mongodb");

module.exports = function localStrategy(){
    passport.use(new Strategy(
        {
            usernameField:"username",
            passwordField: "password"
        },
        (username, password, done) => {
            //Maybe Fetch user from DB
        const user = {username,password};

        const url = "mongodb://localhost:27017";
        const dbName = "pluralsight";

        (async function (){
            let client;
            
            try{
                client = await MongoClient.connect(url);
                const db = client.db(dbName);

                const userFromDB = await db.collection("users").findOne({username: username});

                if(user.password == userFromDB.password){
                    done(null, userFromDB);
                } else {
                    done(null, false);
                }


            }catch(err){
                console.log(chalk.red(err));
            }


            client.close();
        })();



            
        }
    ));

};