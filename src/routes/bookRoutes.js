const express = require("express");
const bookRouter = express.Router();

const chalk = require("chalk");
const bookController = require("../controllers/bookController");


const {getIndex,getById,middleware} = bookController();

function router(opts){
    bookRouter.use(middleware)


bookRouter.route("/").get(getIndex);
bookRouter.route("/:id").get(getById);



return bookRouter;
}





module.exports = router;