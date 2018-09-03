const express = require("express");
const adminRouter = express.Router();
const {MongoClient} = require("mongodb");
const chalk = require("chalk");


function router(opts){
    adminRouter.route("/insert")
    .get((req,res) => {
            const url = "mongodb://localhost:27017";
            const dbName = "pluralsight";

            (async function (){
                let client;
                
                try{
                    client = await MongoClient.connect(url);
                    console.log(chalk.green("Connected to MongoDB"));

                    const db = client.db(dbName);

                    const response = await db.collection("books").insert({Name: "New Book", Description: "description"});

                    res.json(response);

                }catch(err){
                    console.log(chalk.red(err));
                }


                client.close();
            })();

    });

return adminRouter;
}


module.exports = router;