console.log("hello")
// showNotes();
let addBtn=document.getElementById('addBtn');
 addBtn.addEventListener("click", function(e){
console.log("clicked")
// names
     let name=document.getElementById("name");
     let phonenumber=document.getElementById("phonenumber");
     let pinCode=document.getElementById("pincode");
     let Address=document.getElementById("Address");
     let help=document.getElementById("help");
     let names =localStorage.getItem("names");
     if(names==null){
        notesObj=[];
    }else{
        notesObj=JSON.parse(names);
    }
    let myObj={
        pNumber:phonenumber.value,
        namex:name.value,
        pinCode:pinCode.value,
        adres:Address.value,
        Help:help.value
    }
    notesObj.push(myObj);
    localStorage.setItem("names", JSON.stringify(notesObj));
    name.value="";
    phonenumber.value="";
    pinCode.value="";
    Address.value="";
    help.value="";
    console.log(notesObj);


// phonenumber
    //  let phonenumber=document.getElementById("phonenumber");
    //  let phone =localStorage.getItem("phone");
    //  if(phone==null){
    //      phoneObj=[];
    //  }else{
    //      phoneObj=JSON.parse(phone);
    //  }
    //  phoneObj.push(phonenumber.value);
    //  localStorage.setItem("phone", JSON.stringify(phoneObj));
    //  phonenumber.value="";
    //  console.log(phoneObj);
 })






