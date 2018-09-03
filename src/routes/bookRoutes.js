const express = require("express");
const bookRouter = express.Router();
const sql = require("mssql/msnodesqlv8");
const config = require("../../sqlConfig");
const chalk = require("chalk");


function router(opts){
    bookRouter.route("/")
    .get((req,res) => {

            (async function (){
                const request = new sql.Request();
                const result = await request.query("SELECT * FROM Books");
    
                res.send(result.recordset);
            })();

    });

bookRouter.route("/:id")
.all((req,res,next) => {
    const {id} = req.params;

    (async function (){
        const request = new sql.Request();
        const result = await request
        .input("id",sql.Int,id)
        .query("SELECT * FROM Books WHERE Id = @id");
        
        [req.book] = result.recordset;

        next();
    })();
})
.get((req,res) => {
    
    res.send(req.book);
});



return bookRouter;
}





module.exports = router;