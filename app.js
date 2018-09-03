const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const mssql = require("mssql/msnodesqlv8");
const sqlConfig = require("./sqlConfig");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

mssql.connect(sqlConfig).catch(err => {console.log(chalk.red(err));});


const app = express();
const port = process.env.PORT || 3000;



app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: "myApp"}));


require("./config/passport")(app);


app.use(express.static(path.join(__dirname, "/public/")));
app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/jquery/dist")));
app.set("views","./src/views");
app.set("view engine","ejs");


const title = "My App Title";

const bookRouter = require("./src/routes/bookRoutes")({title:title});
app.use("/books", bookRouter) ;

const adminRouter = require("./src/routes/adminRoutes")({title:title});
app.use("/admin", adminRouter) ; 

const authRouter = require("./src/routes/authRoutes")({title:title});
app.use("/auth", authRouter) ; 

app.get("/", (req, res) => {
    //res.sendFile(path.join(__dirname, "/views/index.html"));
    res.render("index", {
        title: "My Application Title",
        nav: [
            {title: "Books", link: "/books"},
            {title: "Authors", link: "/authors"},
            {title: "Categories", link: "/categories"},
        ]
    });
});


app.listen(port, () => {
    debug(chalk.green("Listening on port 3000..."));
});