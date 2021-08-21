var express = require('express'); // Get the module
var app = express(); // Create express by calling the prototype in var express
require("./db/conn");
const path = require("path");
const jwt =require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const user = require('./models/user');
const main = require('./models/main');
const main_find = main.find({});



const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");



app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/" ,(req,res) =>{
    res.send("index")
})
app.get("/helper", (req, res) => {
    res.render("index")
})

//for social service portal 
app.post("/helper", async (req, res) => {
    try {
        const main_saving = new main({
            firstname: req.body.first_name,
            lastname: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zip,
            help_provided: req.body.help,
            description: req.body.comment
        })
        const main_saved = await main_saving.save();
        res.redirect("/");
        // res.send("your data has been saved to the data base");

    } catch (error) {
        console.log("error aa gaya be ");
        console.log(error);
    }
})


//for patients portal
app.get("/patient", (req, res) => {
    
    const token= req.cookies.jwt;
    jwt.verify(token, "yash" ,(err,user_verified)=>{
        if(err){
            res.send("you need to login first");
        }
        else{
            console.log(user_verified);
            res.render("patients_page");
        }
    })
    // res.render("patients_page")
    
})

app.post("/patient", (req, res) => {

    var filter_city = req.body.city;
    var filter_state = req.body.state;
    var filter_help = req.body.help;

    // console.log(filter_fname); 

    if (filter_city != '') {

        var filterparameter = {
            $and: [{ city: filter_city },
            { $and: [{ state: filter_state }, { help_provided: filter_help }] }
            ]
        }
    } else if (filter_city == '') {
        var filterparameter = { $and: [{ state: filter_state }, { help_provided: filter_help }] }

    } else {
        var filterparameter = {}
    }

    var main_filter = main.find(filterparameter);
    main_filter.exec((err, data) => {
        res.render("patients_page", {
            record: data
        })
    })
})


app.post("/signin", async (req, res) => {
    try {
        var email = req.body.email;
        var password = req.body.pwd;
        var confirm_password = req.body.conf_pwd;

        if (confirm_password != password) {
            res.send("put same password in both fields");

        } else {
            const user_details = new user({
                email: email,
                password: password
            })
            const user_saved = await user_details.save();
            // res.send("your details have been saved successfully");
            // const token = jwt.sign(user_d)
            console.log(user_details._id);
            const token = await jwt.sign({id:user_details._id}, "yash");
            console.log(token);
            res.cookie("jwt",token);
            res.redirect('/patient');
        }

    } catch (error) {
        console.log(error);
    }
})

app.post("/login", async (req, res) => {
    try {
        var email_page = req.body.email;
        var password = req.body.password;

        const useremail = await user.findOne({ email: email_page });
        // console.log(useremail);
        if (password === useremail.password) {
            console.log("login successfull");
            res.redirect("/patient");

            const token = await jwt.sign({id:user_details._id}, "yash");
            console.log(token);
            res.cookie("jwt",token);
            res.redirect('/patient');

        } else {
            res.send("invalid login details");
        }

    } catch (error) {
        res.send("invalid login details");
    }
})


app.listen(port, () => {
    console.log("hemlooooo");
})