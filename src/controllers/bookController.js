const sql = require("mssql/msnodesqlv8");
const config = require("../../sqlConfig");

function bookController(params){
    function getIndex(req,res){
        (async function (){
            const request = new sql.Request();
            const result = await request.query("SELECT * FROM Books");

            res.send(result.recordset);
        })();


    }
    function getById(req,res){
        const {id} = req.params;

        (async function (){
            const request = new sql.Request();
            const result = await request
            .input("id",sql.Int,id)
            .query("SELECT * FROM Books WHERE Id = @id");
            
            [req.book] = result.recordset;
            res.send(req.book);
        })();

    }


    function middleware(req,res,next) {
        if(req.user)
            next();
        else
            res.redirect("/");
    }


//Revealing module pattern -> Funcion que contiene funciones y retorna un objeto con dichas funciones
    return {
        getById,
        getIndex,
        middleware
    };




}

module.exports = bookController;