/*eslint-env browser*/
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

function toggleOptions(toggle) {
    "use strict";
    $("optCheese").disabled = toggle;
    $("optSauce").disabled = toggle;
    var toppings =  document.getElementsByClassName("toppings");
    for (var j=0; j <  toppings.length; j++) {
        toppings[j].disabled = toggle;
    }  
}

//utility function
function ReadOnlyForm(formId, isReadOnly) {
    var f = document.forms[formId];
    for(var i=0,fLen=f.length;i<fLen;i++) {
      f.elements[i].readOnly = isReadOnly;  //the "O" must be upper case
      f.elements[i].disabled = isReadOnly;
    }
}

function validateInput(inputName, isValid, feedback) {
    var removeClass = isValid ? "is-invalid" : "is-valid";
    var addClass = isValid ? "is-valid" : "is-invalid";
    var removeClass_feedback = isValid ? "invalid-feedback" : "valid-feedback";
    var addClass_feedback = isValid ? "valid-feedback" : "invalid-feedback";
    
    $(inputName).classList.remove(removeClass);
    $(inputName).classList.add(addClass);
    $(inputName).nextElementSibling.classList.remove(removeClass_feedback);
    $(inputName).nextElementSibling.classList.add(addClass_feedback);
    $(inputName).nextElementSibling.innerHTML = feedback;
}



function isValidDeliveryForm() {
    "use strict";
    var isValid = false;
    var arrRequired = ["name", "addressType", "stAddress", "city", "state", "zipcode", "phoneno", "email"];
    for (var i = 0; i< arrRequired.length; i++) {
        if(isInputEmpty(arrRequired[i])) {
            validateInput(arrRequired[i], false, $(arrRequired[i]).name + " is required");
            isValid = false;
        } else {
                switch(arrRequired[i]) {
                    case "name":
                        isValid = isValidFullName($(arrRequired[i]).value);
//                        isValid ? validateInput(arrRequired[i], true, "looks good") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + "is invalid");
                        break;
                    case "addressType":
                        if($(arrRequired[i]).value === "other" && isInputEmpty("otherAddressType") ) {
                             validateInput("otherAddressType", false, $("otherAddressType").value + "is required");
                            isValid = false;
                        } else if ($(arrRequired[i]).value === "apartment" && isInputEmpty("suiteno") ) {
                             validateInput("suiteno", false, $("suiteno").value + "is required");
                        }
//                        }else if {
//                            validateInput(arrRequired[i], true, "looks good");
//                        }
                        break;
                    case "stAddress":
                        isValid = isValidAddress($(arrRequired[i]).value);
//                        isValid ? validateInput(arrRequired[i], true, "looks good") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + "is invalid");
                        break;
                    case "city":
                        isValid = isValidCity($(arrRequired[i]).value);
                        break;
                    case "state":
                        isValid = isValidState($(arrRequired[i]).value);
//                        isValid ? validateInput(arrRequired[i], true, "looks good") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + "is invalid");
                        break;
                    case "zipcode":
                        isValid = isValidUSZip($(arrRequired[i]).value);
//                        isValid ? validateInput(arrRequired[i], true, "looks good") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + "is invalid");
                        break;
                    case "phoneon":
                        isValid = isValidPhoneNumber($(arrRequired[i]).value);
//                        isValid ? validateInput(arrRequired[i], true, "looks good") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + "is invalid");
                        break;
                    case "email":
                        isValid = isValidEmail($(arrRequired[i]).value);
//                        isValid ? validateInput(arrRequired[i], true, "looks good") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + "is invalid");
                        break;
                    default:
                }
                isValid ? validateInput(arrRequired[i], true, "looks good") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + " is invalid");
        }
//        } else if (arrRequired[i] === "addressType" && $(arrRequired[i]).value !== "") {
//            $(arrRequired[i]).classList.remove('is-invalid');
//            $(arrRequired[i]).classList.add('is-valid');
//           
//            if($(arrRequired[i]).value !== "other") {
//                validateInput(arrRequired[i], true);
//            } else if ($("otherAddressType").value === "") {
//                validateInput("otherAddressType", false, "required information");
//                invalid = true;
//            } else {
//                validateInput("otherAddressType", true, "looks good");
//                invalid = false;
//            }
//        } else {
//            validateInput(arrRequired[i], true, "looks good");
//            invalid = false;
//        }
    }
    
    
    return isValid;    
}

function isInputEmpty(input) {
    return $(input).value.trim() === "" ? true : false;
}

function isValidOrderForm() {
    if ($("total").value !== ""){
        return true;
    }else {
        $("orderMessage").innerHTML = "Order Your Pizza Please";
         return false;
    }      
}

function isValidFullName(fullName) {
    return /^[a-z]+ [a-z]+$/i.test(fullName);
    //return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(fullName);
}

function isValidAddress(address) {
    //return /^[-.?!,;:() A-Za-z0-9]*$/.test(address);
    return /\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?/.test(address);
}

function isValidCity(city) {
    return /(?:[A-Z][a-z.-]+[ ]?)+/.test(city);
}

function isValidState(state) {
    var objRegExp = /^(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i; 
    return objRegExp.test(state);
}


function isValidUSZip(sZip) {
    return /^\d{5}(-\d{4})?$/.test(sZip);
    //\b\d{5}(?:-\d{4})?\b
}

function isValidPhoneNumber(phoneNo) {
    //valid phone number pattern
    //'123-345-3456';
    //'(078)789-8908';
    //'(078) 789-8908'; // Note the space
    //'1234567890'
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNo);
}

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function calculateTotal(){
    "use strict";
    
    var count = 0;
    var toppings = document.getElementsByClassName("toppings");
    for (var i=0; i< toppings.length; i++) {       
       if (toppings[i].checked == true){
          count++;
       }
    }
    
    var sizeCost = parseFloat($("sizeCost").value);
    var optCheese = parseFloat($("optCheese").value);
    var optSauce = parseFloat($("optSauce").value);
    var subtotalToppings = count * 0.99;
    var total = (sizeCost + optCheese + optSauce + subtotalToppings).toPrecision(4) ;

    $("total").value = total;
    $("orderMessage").innerHTML = 'Your Order Total is: <img src="images/pizzaman.png" alt="pizzaman" width="50px"/>';
}

window.addEventListener("load", function () {
    "use strict";
     var doughSizePrize = {
                         handTossed:[{size:"Small", price:"$9.99"},
                                     {size:"Medium", price:"$12.99"},
                                     {size:"Large", price:"$14.99"},
                         ],
                         thinCrust:[{size:"Medium", price:"$11.99"},
                                     {size:"Large", price:"$13.99"},
                         ],
                         newYorkStyle:[{size:"Large", price:"$16.99"},
                                     {size:"Extra Large", price:"$19.99"},
                         ],
                         glutenFree:[{size:"Small", price:"$10.99"}]                                
                         }
     
    var optdoughlist =  document.getElementsByName('optdough');
    var optdoughItems = [].slice.call(optdoughlist);
    
    //  hide the input for billing information initially
    //$("billingInfo").style.display ="none";
    
    //  hide the input for other address type initially
    $("otherAddressType").style.display = "none";
    $("addressType").addEventListener("change", function(){
        "use strict";
        if(this.value === "other") {
            $("otherAddressType").previousElementSibling.style.display = "none";
            $("otherAddressType").style.display = "block";
            
        } else {
            $("otherAddressType").style.display = "none";
        }
    });
    toggleOptions(true);
    //window.alert( document.getElementsByClassName("toppings").length);
    optdoughItems.forEach(function (item) {
        "use strict";
        item.addEventListener('change',function(){
      
        var selectedDough = doughSizePrize[item.id];
        //window.alert(selectedDough.length);
        $('sizeCost').innerHTML = null;
        for(var i = 0; i < selectedDough.length; i++) {
            //var opt = doughSizePrize[item.id][i];
            var el = document.createElement("option");
            el.textContent = selectedDough[i].size +  " (" + selectedDough[i].price + ")";
            //el.value = selectedDough[i].size +  selectedDough[i].price;
            el.value = selectedDough[i].price.substr(1);
            $('sizeCost').appendChild(el);
        }
        toggleOptions(false);
        //$("total").value = $("sizeCost").value;
        calculateTotal();
       
     });
    });
    $("sizeCost").addEventListener("change", calculateTotal);
    $("optCheese").addEventListener("change", calculateTotal);
    $("optSauce").addEventListener("change", calculateTotal);
    var optToppingsList =  document.getElementsByClassName('toppings');
    var optToppingsItems = [].slice.call(optToppingsList);
    
    optToppingsItems.forEach(function (item) {
        "use strict";
        item.addEventListener('change',function(){
            calculateTotal();
        });
    });
    
    $("btnFinishBuildPizza").addEventListener("click",function(e){
        if (this.innerHTML.trim() === "Finished Building Pizza"){
            if((!isValidDeliveryForm()) || (!isValidOrderForm())) {
                e.stopImmediatePropagation();      
            }
        }else{
             $("billingInfo").style.display = "none";
             ReadOnlyForm("deliveryLocation", false);
             ReadOnlyForm("order", false);
             $("btnFinishBuildPizza").innerHTML = "Finished Building Pizza";
             e.stopImmediatePropagation();
        }
      
    });
    
    $("proceedToCheckout").addEventListener("click", function(){
        $("Confirmation_buildingPizza").style.display = "none";
        $("billingInfo").style.display = "block";
        ReadOnlyForm("deliveryLocation", true);
        ReadOnlyForm("order", true);
        $("btnFinishBuildPizza").innerHTML = "Change Delivery Location or Order";
        window.location.hash = "billingInfo";
    });
    
    $("name").addEventListener("blur", function(e){
        if(isValidFullName(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("stAddress").addEventListener("blur", function(e){
        if(isValidAddress(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("city").addEventListener("blur", function(e){
        if(isValidCity(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("state").addEventListener("blur", function(e){
        if(isValidState(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("zipcode").addEventListener("blur", function(e){
        if(isValidUSZip(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("phoneno").addEventListener("blur", function(e){
        if(isValidPhoneNumber(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("email").addEventListener("blur", function(e){
        if(isValidEmail(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("sameAsDeli").addEventListener("click", function(){
        if(this.checked) {
           $("cardHolderName").value = $("name").value;
           $("bStAddress").value = $("stAddress").value;
           $("bSuiteNo").value = $("suiteno").value;
           $("bCity").value = $("city").value;
           $("bState").value = $("state").value;
           $("bZipCode").value = $("zipcode").value; 
        }
    });
    
    $("cardHolderName").addEventListener("blur", function(e){
        if(isValidFullName(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    $("bStAddress").addEventListener("blur", function(e){
        if(isValidAddress(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bCity").addEventListener("blur", function(e){
        if(isValidCity(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    $("bState").addEventListener("blur", function(e){
        if(isValidState(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bZipCode").addEventListener("blur", function(e){
        if(isValidUSZip(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
   
});


