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
    "use strict";
    var f = document.forms[formId];
    for(var i=0,fLen=f.length;i<fLen;i++) {
      f.elements[i].readOnly = isReadOnly;  //the "O" must be upper case
      f.elements[i].disabled = isReadOnly;
    }
}

function validateInput(inputName, isValid, feedback) {
    "use strict";
    if(isValid!=="unknown"){
        var removeClass = isValid ? "is-invalid" : "is-valid";
        var addClass = isValid ? "is-valid" : "is-invalid";
        var removeClass_feedback = isValid ? "invalid-feedback" : "valid-feedback";
        var addClass_feedback = isValid ? "valid-feedback" : "invalid-feedback";
        $(inputName).classList.remove(removeClass);
        $(inputName).classList.add(addClass);
        if($(inputName).nextElementSibling.nodeName !== "DIV") {      
            $(inputName).nextElementSibling.nextElementSibling.classList.remove(removeClass_feedback);
             $(inputName).nextElementSibling.nextElementSibling.classList.add(addClass_feedback);
             $(inputName).nextElementSibling.nextElementSibling.innerHTML = feedback;
        } else {
          $(inputName).nextElementSibling.classList.remove(removeClass_feedback);
          $(inputName).nextElementSibling.classList.add(addClass_feedback);
          $(inputName).nextElementSibling.innerHTML = feedback;
        }
    }else{
        $(inputName).classList.remove("is-invalid");
        $(inputName).classList.remove("is-valid");
        if($(inputName).nextElementSibling.nodeName !== "DIV") {      
            $(inputName).nextElementSibling.nextElementSibling.classList.remove("is-invalid");
             $(inputName).nextElementSibling.nextElementSibling.classList.remove("is-valid");
             $(inputName).nextElementSibling.nextElementSibling.innerHTML = feedback;
        } else {
          $(inputName).nextElementSibling.classList.remove("is-invalid");
          $(inputName).nextElementSibling.classList.remove("is-valid");
          $(inputName).nextElementSibling.innerHTML = feedback;
        }
    }  
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
    "use strict";
    return $(input).value.trim() === "" ? true : false;
}

function isValidOrderForm() {
    "use strict";
    if ($("total").value !== ""){
        return true;
    }else {
        $("orderMessage").innerHTML = "Order Your Pizza Please";
         return false;
    }      
}

function isValidFullName(fullName) {
    "use strict";
    return /^[a-z]+ [a-z]+$/i.test(fullName);
    //return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(fullName);
}

function isValidAddress(address) {
    "use strict";
    //return /^[-.?!,;:() A-Za-z0-9]*$/.test(address);
    return /\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?/.test(address);
}

function isValidCity(city) {
    "use strict";
    return /(?:[A-Z][a-z.-]+[ ]?)+/.test(city);
}

function isValidState(state) {
    "use strict";
    var objRegExp = /^(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i; 
    return objRegExp.test(state);
}


function isValidUSZip(sZip) {
    "use strict";
    return /^\d{5}(-\d{4})?$/.test(sZip);
    //\b\d{5}(?:-\d{4})?\b
}

function isValidPhoneNumber(phoneNo) {
    "use strict";
    //valid phone number pattern
    //'123-345-3456';
    //'(078)789-8908';
    //'(078) 789-8908'; // Note the space
    //'1234567890'
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNo);
}

function isValidEmail(email) {
    "use strict";
    return /\S+@\S+\.\S+/.test(email);
}

function isValidCVV(cvv) {
    "use strict";
    return /^[0-9]{3,4}$/.test(cvv);
}

function isValidExpirationDate(month,year){
    "use strict";
    var cur_year = new Date().getFullYear();

    if(cur_year == parseInt(year,10)) {     
        var cur_month = new Date().getMonth() + 1; // getMonth() returns 0=January, 1=February 
        return parseInt(month,10) >= cur_month;
    } 
    return true;
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
    
    $("btnFinishBuildPizza").addEventListener("click",function(e) {
        "use strict";
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
        "use strict";
        $("Confirmation_buildingPizza").style.display = "none";
        $("billingInfo").style.display = "block";
        ReadOnlyForm("deliveryLocation", true);
        ReadOnlyForm("order", true);
        $("btnFinishBuildPizza").innerHTML = "Change Delivery Location or Order";
        window.location.hash = "billingInfo";
    });
    
    $("name").addEventListener("blur", function(e){
        "use strict";
        if(isValidFullName(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("stAddress").addEventListener("blur", function(e){
        "use strict";
        if(isValidAddress(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("city").addEventListener("blur", function(e){
        "use strict";
        if(isValidCity(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("state").addEventListener("blur", function(e){
        "use strict";
        if(isValidState(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("zipcode").addEventListener("blur", function(e){
        "use strict";
        if(isValidUSZip(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("phoneno").addEventListener("blur", function(e){
        "use strict";
        if(isValidPhoneNumber(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("email").addEventListener("blur", function(e){
        "use strict";
        if(isValidEmail(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("sameAsDeli").addEventListener("click", function(){
        "use strict";
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
        "use strict";
        if(isValidFullName(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    $("bStAddress").addEventListener("blur", function(e){
        "use strict";
        if(isValidAddress(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bCity").addEventListener("blur", function(e){
        "use strict";
        if(isValidCity(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    $("bState").addEventListener("blur", function(e){
        "use strict";
        if(isValidState(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bZipCode").addEventListener("blur", function(e){
        "use strict";
        if(isValidUSZip(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
   
    $("cvv").addEventListener("blur", function(e){
        "use strict";
        if(isValidCVV(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "looks good");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
     $("expiryMonth").addEventListener("blur", function(e){
         "use strict";
         if(isInputEmpty(e.currentTarget.id)) {
            validateInput(e.currentTarget.id, false, "Please select a month"); 
         } else if (isInputEmpty("expiryYear")) { 
            validateInput(e.currentTarget.id, true, "Please select a year"); 
         } else if (isValidExpirationDate(e.currentTarget.value, $("expiryYear").value)) {
             validateInput("expiryMonth", true, "looks good"); 
             validateInput("expiryYear", true, "looks good"); 
         } else {
            validateInput("expiryMonth", false, "Your card is expired");
            validateInput("expiryYear", false, "Your card is expired"); 
         }
         
//         if(isValidExpirationDate(e.currentTarget.value, $("expiryYear").value)) {
//              validateInput("expiryYear", true, "looks good"); 
//         } else {
//            validateInput("expiryYear", false, "invalid input"); 
//        }

    });
    
     $("expiryYear").addEventListener("blur", function(e){
         "use strict";
         if(isInputEmpty(e.currentTarget.id)) {
            validateInput(e.currentTarget.id, false, "Please select a year"); 
         } else if (isInputEmpty("expiryMonth")) { 
            validateInput(e.currentTarget.id, true, "Please select a month"); 
         } else if (isValidExpirationDate($("expiryMonth").value, e.currentTarget.value)) {
             validateInput("expiryMonth", true, "looks good"); 
             validateInput("expiryYear", true, "looks good"); 
         } else {
            validateInput("expiryMonth", false, "Your card is expired"); 
            validateInput("expiryYear", false, "Your card is expired");
             
         }
    });
    
    $("expiryYear").addEventListener("blur", function(e){
         "use strict";
         if(isInputEmpty(e.currentTarget.id)) {
            validateInput(e.currentTarget.id, false, "Please select a year"); 
         } else if (isInputEmpty("expiryMonth")) { 
            validateInput(e.currentTarget.id, true, "Please select a month"); 
         } else if (isValidExpirationDate($("expiryMonth").value, e.currentTarget.value)) {
             validateInput("expiryMonth", true, "looks good"); 
             validateInput("expiryYear", true, "looks good"); 
         } else {
            validateInput("expiryMonth", false, "Your card is expired"); 
            validateInput("expiryYear", false, "Your card is expired");
             
         }
    });
    function isCardNoValidPrefix(cardNo){
        "use strict";
        if(cardNo!==""){
            var valid1stDigits = ["4","5","3"];
            var validPrefix2Digits = ["40","41", "42", "43", "44", "45", "46", "47", "48", "49","51","52","53","54","55","37"];
            //var stringfyCardNo = cardNo.toString();
            if(cardNo.length === 1){
                return valid1stDigits.indexOf(cardNo[0]) > -1;
            }
            else {
                return validPrefix2Digits.indexOf(cardNo.substr(0,2)) > -1 ;
            }
            
        } else {
            return false;
        }  
    }
    function isNotNum(cardNo) {
        "use strict";
        var lastDigit = cardNo.slice(-1);
        return isNaN(parseInt(lastDigit,10));        
    }
    function isValidCardLength(cardNo) {
        "use strict";
        var carPrefix = parseInt(cardNo.substr(0,2), 10);
        switch(carPrefix) {
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47:
            case 48:
            case 49:
                if(cardNo.length === 13 || cardNo.length === 16) {
                    return true;
                }
                break;
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
                if(cardNo.length === 16) {
                    return true;
                }
                break;
            case 37:
                if(cardNo.length === 15) {
                    return true;
                }
                break;
            default:
                return false;
        }
    }
    
    function isValidCreditCard(value) {
        "use strict";
        if(isNotNum(value) && isCardNoValidPrefix(value) && isValidCardLength(value)) {
            var cDigit="", nCheck = 0, nDigit = 0, bEven = false;  
            for (var n = value.length - 1; n >= 0; n--) {
            cDigit = value.charAt(n);
            nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) {                  
                    nDigit = nDigit.toString();
                }
            }
            
            if(typeof nDigit === 'string' || nDigit instanceof String) { 

                nCheck += parseInt(nDigit[0], 10) + parseInt(nDigit[1], 10);
            }
            else {
                nCheck += nDigit;
               
            }
         
            bEven = !bEven;
        }
            return (nCheck % 10) == 0;
        } else {
            return false;
        }
    }
    
    function creditCardType(cardNo){
        "use strict";
        switch(cardNo.substr(0,1)) {
            case "4":
                return "Visa";
            case "5":
                return "Master";
            case "3":       
                return "American Express";
            default:
                break;
        }
    }
    
    function isValidBillingForm() {
    "use strict";
    var isValid = false;
    var inputs = document.forms["billingInfo"].querySelectorAll("input[type=text]");
    var selects = document.forms["billingInfo"].getElementsByTagName('select');
    for (var i = 0; i< inputs.length; i++) {
        if(isInputEmpty(inputs[i].id)) {
            validateInput(inputs[i].id, false, inputs[i].name + " is required");
        } else {
             switch(inputs[i].id) {
                    case "cardHolderName":
                        isValid = isValidFullName($(inputs[i].id).value);
                        break;
                    case "cardNumber":
                        isValid = isValidCreditCard($(inputs[i].id).value);
                        break;
                    case "bStAddress":
                        isValid = isValidAddress($(inputs[i].id).value);
                        break;
                    case "bCity":
                        isValid = isValidCity($(inputs[i].id).value);
                        break;
                    case "bState":
                        isValid = isValidState($(inputs[i].id).value);
                        break;
                    case "bZipCode":
                        isValid = isValidUSZip($(inputs[i].id).value);
                        break;
                    case "cvv":
                        isValid = isValidCVV($(inputs[i].id).value);
                        break;
                    default:
            }
            isValid ? validateInput(inputs[i].id, true, "looks good") : validateInput(inputs[i].id, false, inputs[i].name + " is invalid");
        }
       
    }
        
    var message="";
    for (var j = 0; j< selects.length; j++) {
        if(isInputEmpty(selects[j].id)) {
            message += selects[j].name + " ";
            validateInput(selects[j].id, false, message + "is required");
        } else {
           if(j !== 0) {
               isValid = isValidExpirationDate(selects[j-1],selects[j]);
           }  
        }
        isValid ? validateInput(selects[j].id, true, "looks good") : validateInput(selects[j].id, false, selects[j].name + " is invalid");
    }
    return isValid;
        
//        if(isInputEmpty(arrRequired[i])) {
//            validateInput(arrRequired[i], false, $(arrRequired[i]).name + " is required");
//            isValid = false;
//        } else {
//                switch(arrRequired[i]) {
//                    case "name":
//                        isValid = isValidFullName($(arrRequired[i]).value);
//                        break;
//                    case "addressType":
//                        if($(arrRequired[i]).value === "other" && isInputEmpty("otherAddressType") ) {
//                             validateInput("otherAddressType", false, $("otherAddressType").value + "is required");
//                            isValid = false;
//                        } else if ($(arrRequired[i]).value === "apartment" && isInputEmpty("suiteno") ) {
//                             validateInput("suiteno", false, $("suiteno").value + "is required");
//                        }
//                        break;
//                    case "stAddress":
//                        isValid = isValidAddress($(arrRequired[i]).value);
//                        break;
//                    case "city":
//                        isValid = isValidCity($(arrRequired[i]).value);
//                        break;
//                    case "state":
//                        isValid = isValidState($(arrRequired[i]).value);
//                        break;
//                    case "zipcode":
//                        isValid = isValidUSZip($(arrRequired[i]).value);
//                        break;
//                    case "phoneon":
//                        isValid = isValidPhoneNumber($(arrRequired[i]).value);
//                        break;
//                    case "email":
//                        isValid = isValidEmail($(arrRequired[i]).value);
//                        break;
//                    default:
//                }
//                isValid ? validateInput(arrRequired[i], true, "looks good") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + " is invalid");
//        }
//    }
//    return isValid;    
}
    $("cardNumber").addEventListener("keyup",function(e){
       "use strict";
       var cardNo = e.currentTarget.value;
       var creditCardInputId = e.currentTarget.id;
       if (isNotNum(cardNo)) {
          validateInput(creditCardInputId, false, "Credit Card can't contain non numeric character!");
          //not allow space and other non number typing in credit card
          this.value = this.value.slice(0, -1);

       } else if (!isCardNoValidPrefix(cardNo)){
          validateInput(creditCardInputId, false, "Sorry! Only Visa(4), MasterCard(51,52,53,54,55) or American Express(37) are accepted");
          //not allow typing unacceptable card prefix in credit card
          this.value = this.value.slice(0, -1);
       }else if (!(isValidCardLength(cardNo))){
          validateInput(creditCardInputId, false, "Valid number of digits for Visa (13 or 16), MasterCard(16), American Express(15)");
       }else if(!isValidCreditCard(cardNo)){
          validateInput(creditCardInputId, false, "Invalid Card Number");
       }else{
          validateInput(creditCardInputId, true, "Your " + creditCardType(cardNo) + " Card looks good");
       }                            
    });
    
     $("btnPay").addEventListener("click", function(){
        "use strict";
        if (isValidBillingForm()) {
            window.location.href = "confirmation.html";
        } else {
            return;
        }
    });
    
});


