const express = require("express");
const {MongoClient} = require("mongodb");
const chalk = require("chalk");
const passport = require("passport");



function router(){
const authRouter = express.Router();

authRouter.route("/signup")
    .post((req,res) => {
        console.log(chalk.blue("Body: "));
        console.log(req.body);
        

        //Create user in DB
        const  {username,password} = req.body;
        const user = {username,password};

        const url = "mongodb://localhost:27017";
        const dbName = "pluralsight";

        (async function (){
            let client;
            
            try{
                client = await MongoClient.connect(url);
                const db = client.db(dbName);

                const response = await db.collection("users").insertOne(user);

                req.login(response.ops[0], () => {
                    res.redirect("/auth/profile");
                });
                

            }catch(err){
                console.log(chalk.red(err));
            }


            client.close();
        })();

    });



    authRouter.route("/signin")
        .get((req,res) => {
            res.render("signin");
        })
        .post(passport.authenticate("local", {
            successRedirect: "/auth/profile",
            failureRedirect: "/"
        }));

authRouter.route("/profile")
    .all((req,res,next) => {
        if(req.user)
            next();
        else
            res.redirect("/");
    })
    .get((req,res) => {
        res.json(req.user);
    });



return authRouter;
}

module.exports = router;