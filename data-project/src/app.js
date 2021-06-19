var express = require('express'); // Get the module
var app = express(); // Create express by calling the prototype in var express
require("./db/conn");
const path =require("path");
const port = process.env.PORT || 3000;
const hbs =require('hbs');
const contact = require('./models/contact');
var user =contact.find({});


const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views")
const partials_path =path.join(__dirname, "../templates/partials")



// app.use(express.static(static_path));
app.set("view engine" , "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/",(req,res)=>{
    res.render("index")
    // res.send("hello madarchod")
})


app.post("/", async (req,res)=>{
    try {
        const contacting = new contact({
            firstname :req.body.firstname,
            lastname :req.body.lastname,
            country :req.body.country,
            subject :req.body.subject
        })
        const contact_saved = await contacting.save();

        res.send("ho gaya save londe");
        
    } catch (error) {
        console.log(error);
    }
})

app.get("/filter",(req,res)=>{
    // user.exec((err,data)=>{
    //     res.render("filter_page",{
    //         record:data
    //     })
    // })
    res.render("filter_page")
})

app.post("/filter",(req,res)=>{

    var filter_fname= req.body.firstname;
    var filter_lname= req.body.lastname;
    var filter_country= req.body.country;

    // console.log(filter_fname); 

    if(filter_fname!='' && filter_lname!='' && filter_country!=''){

        var filterparameter = {$and:[{ firstname : filter_fname},
            {$and:[{lastname:filter_lname},{country:filter_country}]}
        ]}
    }else if(filter_fname!='' && filter_lname=='' && filter_country!=''){
        var filterparameter ={$and:[{firstname :filter_fname},{country:filter_country}]}

    }else if(filter_fname=='' && filter_lname!='' && filter_country!=''){
        var filterparameter ={$and:[{lastname :filter_lname},{country:filter_country}]}
        
    }else if(filter_fname=='' && filter_lname=='' && filter_country!=''){
        var filterparameter={country: filter_country}
    }else{
        var filterparameter={}
    }
    // console.log(filterparameter);

    var contact_filter =contact.find(filterparameter);
    contact_filter.exec((err,data)=>{
        res.render("filter_page",{
            record:data
        })
    })
})

app.listen(port, ()=>{
    console.log("hemlooooo");
})