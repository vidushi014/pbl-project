var express = require('express'); // Get the module
var app = express(); // Create express by calling the prototype in var express
require("./db/conn");
const path = require("path");
const port = process.env.PORT || 3000;
const hbs = require('hbs');
// const contact = require('./models/contact');
// var contact_find = contact.find({});
const user = require('./models/user');
const main = require('./models/main');
const main_find = main.find({});
// var user_find = user.find({});



const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");



app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/",(res,req)=>{
//     res.send(index);
// })

app.get("/helper", (req, res) => {
    res.render("helpers_page")
    // res.send("hello madarchod")
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

        res.send("ho gaya save londe");

    } catch (error) {
        console.log(error);
    }
})

//for patients portal
app.get("/patient", (req, res) => {
    // user.exec((err,data)=>{
    //     res.render("filter_page",{
    //         record:data
    //     })
    // })
    res.render("patients_page")
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
    // console.log(filterparameter);

    var main_filter = main.find(filterparameter);
    main_filter.exec((err, data) => {
        res.render("patients_page", {
            record: data
        })
    })
})

//sign in functionality 

// app.post("/login", (req, res) => {
//     console.log("login waala req aa rha");
// })

app.post("/signin", async (req, res) => {
    try {
        var email = req.body.email;
        var password = req.body.pwd;
        var confirm_password = req.body.conf_pwd;
        // console.log(`${name} ${password} ${confirm_password}`);

        if (confirm_password != password) {
            res.send("put same password in both fields");

        } else {
            const user_details = new user({
                email: email,
                password: password
            })
            const user_saved = await user_details.save();
            // res.send("your details have been saved successfully");
            console.log("data has been saved sucessfully");
            res.redirect('/');
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