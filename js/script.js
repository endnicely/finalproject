/*eslint-env browser*/
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

function toggleOptions(toggle) {
    $("optCheese").disabled = toggle;
    $("optSauce").disabled = toggle;
    var toppings =  document.getElementsByClassName("toppings");
    for (var j=0; j <  toppings.length; j++) {
        toppings[j].disabled = toggle;
    }
    
}
function validateDeliveryForm() {
    "use strict";
    var invalid = false;
    var arrRequired = ["name", "stAddress", "city", "state", "zipcode", "phoneno", "email"];
    for (var i = 0; i< arrRequired.length; i++) {
        if($(arrRequired[i]).value === "") {
            
            $(arrRequired[i]).classList.add('is-invalid');
            $(arrRequired[i]).nextElementSibling.classList.add('invalid-feedback');
            $(arrRequired[i]).nextElementSibling.innerHTML = "required field";
            invalid = true;

        }
    }
    return invalid;
    
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
    });
    
    $("proceedToCheckout").addEventListener("click", function(){  
        $("Confirmation_buildingPizza").style.display = "none";
        $("billingInfo").style.display = "block";
        window.location.hash = "billingInfo";
    });
    
});


