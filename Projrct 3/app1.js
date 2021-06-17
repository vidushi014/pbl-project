// showNotes();
function showNotes(){
    // Names
    let names = localStorage.getItem("names");
    if(names==null){
       notesObj=[];
   }else{
       notesObj=JSON.parse(names);
   }
   let htmlN="";
   notesObj.forEach( function(element , index) {
       htmlN+=` <div class="noteCard mx-2 my-2">
       <div class="card-body">
       <img src="" alt="image">
       <span><h3>name ${element.namex}</h3></span>
       <span id="names"></span>
       <span><h3>phone number ${element.pNumber}</h3></span>
       <span><h3>Address ${element.adres}</h3></span>
       <span><h3>pin code ${element.pinCode}</h3></span>
       <h2>Help Provided By you</h2>
       <span><h3> ${element.Help}</h3></span>
       </div>
       </div>
      `
   });
   let notesElm=document.getElementById("container");
   if(notesObj.length !=0){
       notesElm.innerHTML=htmlN;
   }else{
       notesElm.innerHTML=`Nothing to Show . Use "Add note" button to add a note`
   }

// Phone NUmbers
// let phone = localStorage.getItem("phone");
//     if(phone==null){
//        phoneObj=[];
//    }else{
//       phoneObj=JSON.parse(phone);
//    }
//    let htmlP="";
//    phoneObj.forEach( function(element , index) {
//        htmlP+=`<span>${element}</span>`
//    });
//    let phoneElm=document.getElementById("number");
//    if(phoneObj.length !=0){
//        phoneElm.innerHTML=htmlP;
//    }else{
//        notesElm.innerHTML=`Nothing to Show . Use "Add note" button to add a note`
//    }

}

showNotes()