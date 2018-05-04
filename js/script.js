/*eslint-env browser*/
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

window.addEventListener("load", function () {
    "use strict";
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
   
});


