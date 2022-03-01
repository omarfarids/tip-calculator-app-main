// ===== DOM items =====
let bill = document.getElementById("bill");
let billError = document.getElementById("error1");
let activeBtn = document.querySelector(".active");
let custom = document.querySelector("#custom");
let numOfPeople = document.getElementById("people");
let peopleError = document.getElementById("error2");
let selections = document.querySelectorAll(".tip-percentage button");
let tipAmount = document.getElementById("tip-amount");
let totalAmount = document.getElementById("total");
let resetBtn = document.getElementById("reset");


// ===== local variables =====
let billInput = false;
let customInput = false;
let peopleInput = false;
let tipPercentage;

// ===== events =====
// adding (.active) class to selections button 
selections.forEach(e=>{
    e.addEventListener("click",function(event){
        event.preventDefault();
        selections.forEach(ele=>{
            ele.classList.remove("active");
        });
        e.classList.add("active");
        tipPercentage = document.querySelector(".tip-percentage button.active").value;
        customInput = true;
    });
});

// setting input values to false if form is empty 
bill.addEventListener("blur",function(){
    if(bill.value === ""){
        billInput = false;
    }
});
custom.addEventListener("blur",function(){
    if(custom.value === ""){
        customInput= false;
    }
});
numOfPeople.addEventListener("blur",function(){
    if(numOfPeople.value === ""){
        peopleInput = false;
    }
});


// taking bill 
bill.addEventListener("blur",function(){
    if(bill.value !== ""){
        billInput = true;
    }
});
// taking customed descount 
custom.addEventListener("blur",function(){
    if(custom.value !== ""){
        selections.forEach(ele=>{
            ele.classList.remove("active");
        });
        tipPercentage = custom.value / 100;
        customInput = true;
    }
});
// taking number of people 
numOfPeople.addEventListener("blur",function(){
    if(numOfPeople.value !== ""){
        peopleInput = true;
    }
});


// updating event 
numOfPeople.addEventListener("blur",updateData);
bill.addEventListener("blur",updateData);
custom.addEventListener("blur",updateData);
custom.addEventListener("blur",updateData);
selections.forEach(e=>e.addEventListener("click",updateData));
bill.addEventListener("blur",function(){
    formValidation(bill,billError);
});
numOfPeople.addEventListener("blur",function(){
    formValidation(numOfPeople,peopleError);
});

// reset button 
resetBtn.addEventListener("click",function(){
    bill.value = "";
    custom.value = "";
    numOfPeople.value = "";
    billInput = false;
    customInput = false;
    peopleInput = false;
    selections.forEach(e=>{
        e.classList.remove("active");
    });
    tipAmount.innerHTML = "$0.00";
    totalAmount.innerHTML ="$0.00";
    resetBtn.style.opacity = "0.3"
})

// ===== functions ===== 
// calculations inside tip-amount and total 
function updateData(){
    if(billInput === true){
        if(customInput === true){
            if(peopleInput === true){
                let tipValue = bill.value * tipPercentage / numOfPeople.value
                tipAmount.innerHTML = tipValue.toFixed(2);
                totalAmount.innerHTML =((bill.value / numOfPeople.value) + tipValue).toFixed(2);
                resetBtn.style.opacity = "1"
            } else {
                tipAmount.innerHTML = "$0.00";
                totalAmount.innerHTML ="$0.00";
                resetBtn.style.opacity = "0.3"
            }
        }
    }
}
// form validation 
function formValidation(element,msg) {
    if(element.value == "0"){
        msg.innerHTML = "Can't be Zero";
        element.style.border = "2px solid tomato";
    } else if (typeof parseInt(element.value) === "NaN"){
        msg.innerHTML = "Must be a Number";
        element.style.border = "2px solid tomato";
    } else {
        msg.innerHTML = "";
        element.style.border = "unset";
    }
}
