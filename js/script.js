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
function validateInput(inputName, isValid) {
    if (isValid) {
        $(inputName).classList.remove('is-invalid');
        $(inputName).classList.add('is-valid');
        $(inputName).nextElementSibling.classList.remove('invalid-feedback');
        $(inputName).nextElementSibling.classList.add('valid-feedback');
        $(inputName).nextElementSibling.innerHTML = "looks good";
    } else {
            $(inputName).classList.remove('is-valid');
            $(inputName).classList.add('is-invalid');
            $(inputName).nextElementSibling.classList.remove('valid-feedback');
            $(inputName).nextElementSibling.classList.add('invalid-feedback');
            $(inputName).nextElementSibling.innerHTML = "required information";
    }
}

function validateDeliveryForm() {
    "use strict";
    var invalid = false;
    var arrRequired = ["name", "addressType", "stAddress", "city", "state", "zipcode", "phoneno", "email"];
//    var specialAddressType = ["apartment", "other"];
    for (var i = 0; i< arrRequired.length; i++) {
        if($(arrRequired[i]).value === "") {
            validateInput(arrRequired[i], false);
            invalid = true;

        } else if (arrRequired[i] === "addressType" && $(arrRequired[i]).value !== "") {
            $(arrRequired[i]).classList.remove('is-invalid');
            $(arrRequired[i]).classList.add('is-valid');
           
            if($(arrRequired[i]).value !== "other") {
                validateInput(arrRequired[i], true);
            } else if ($("otherAddressType").value === "") {
                validateInput("otherAddressType", false);
                invalid = true;
            } else {
                validateInput("otherAddressType", true);
                invalid = false;
            }
        } else {
            validateInput(arrRequired[i], true);
            invalid = false;
        }
    }
    if($("addressType").value === "apartment" && $("suiteno").value === "" ) {
        validateInput("suiteno", false);
        invalid = true;
    }
    
    return invalid;
    
}

function validateOrderForm() {
    if ($("total").value = ""){
        return false;
    }       
}


function isValidFullName(fullName) {
//    var regexp = new RegExp("/^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/");
//    return /^[a-zA-Z ]{2,30}$/.test(fullName);
    return (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g).test(fullName);
}
function isValidUSZip(sZip) {
    return /^\d{5}(-\d{4})?$/.test(sZip);
}
function isValidPhoneNumber(phoneNo) {
    //valid phone number
    //'123-345-3456';
    //'(078)789-8908';
    //'(078) 789-8908'; // Note the space
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNo);
}

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function isValidState(state) {
    return /^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD||TN|TX|UT|VT|VA|WA|WV|WI|WY)$/.test(state);
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
    $("billingInfo").style.display ="none";
    
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
        if(validateDeliveryForm()) {
            e.stopImmediatePropagation();      
        }
        
        if (!validateOrderForm()) {
            e.stopImmediatePropagation();
            $("orderMessage").innerHTML = "Order Your Pizza Please";
        }
    });
    
    $("proceedToCheckout").addEventListener("click", function(){  
        $("Confirmation_buildingPizza").style.display = "none";
        $("billingInfo").style.display = "block";
        window.location.hash = "billingInfo";
    });
    
    $("name").addEventListener("mouseout", function(e){
        if(isValidFullName(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true);   
        } else {
            validateInput(e.currentTarget.id, false); 
        }
    });
    
    $("zipcode").addEventListener("mouseout", function(e){
        if(isValidUSZip(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true);   
        } else {
            validateInput(e.currentTarget.id, false); 
        }
    });
    
    $("phoneno").addEventListener("mouseout", function(e){
        if(isValidPhoneNumber(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true);   
        } else {
            validateInput(e.currentTarget.id, false); 
        }
    });
    
    $("email").addEventListener("mouseout", function(e){
        if(isValidEmail(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true);   
        } else {
            validateInput(e.currentTarget.id, false); 
        }
    });
    
    $("state").addEventListener("mouseout", function(e){
        if(isValidState(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true);   
        } else {
            validateInput(e.currentTarget.id, false); 
        }
    });
});


