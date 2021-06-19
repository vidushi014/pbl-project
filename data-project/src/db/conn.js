const mongoose = require ('mongoose');

mongoose.connect("mongodb://localhost:27017/PBL",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`connection ho gaya`);
}).catch((err)=>{
    console.log(err);
})
