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

function calculateTotal(){
    "use strict";
    //window.alert(document.getElementsByClassName('input[class="toppings"]').length);
    
    var count = 0;
    var toppings = document.getElementsByClassName("toppings");
    //window.alert(toppings.length);
    for (var i=0; i< toppings.length; i++) {       
       if (toppings[i].checked == true){
          count++;
       }
    }
    //window.alert(document.getElementsByClassName('input[class="toppings"]:checked').length);
    window.alert($("sizeCost").value);
    window.alert($("optCheese").value);
    //var total = parseFloat($("sizeCost").value) + parseFloat($("optCheese").value) + parseFloat($("optSauce").value) + count * 0.99 ;
    var total = Number($("sizeCost").value) + Number($("optCheese").value) + Number($("optSauce").value) + count * 0.99 ;
//    var total = parseFloat(($("sizeCost").value).toFixed(2)) + parseFloat(($("optCheese").value).toFixed(2)) +   parseFloat(($("optSauce").value).toFixed(2)) + count * 0.99 ;
  
    window.alert(total);
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
     $("proceedToCheckout").addEventListener("click", function(){
        $("Confirmation_buildingPizza").style.display = "none";
        //$("Confirmation_buildingPizza").setAttribute("data-dismiss", "modal");
        $("billingInfo").style.display = "block"; 
     });
   //$("toppings").addEventListener("click", calculateTotal);
//    buttons.addEventListener("click", function (e) {
//	window.console.log(e.target.innerText);
//});

    
});


