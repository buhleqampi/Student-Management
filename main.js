let sum = "";
let InputValue = document.getElementById("butt");
let allowComa = true;
let screen = document.querySelector('.digits');

// buttons calculating
function addToSum(number){
    document.getElementById("output").value += number;

}
// dot appearing once
function symbol (number) {
    document.getElementById("output").value += number;
    allowComa = true;
    }
    
    
    function showDecimal (number) {
        if (allowComa === true) {
            document.getElementById("output").value +=  number;
            allowComa = false;
        }
    }
// AC
function clearSum() {
sum = "";
document.getElementById("output").value = InputValue;
}
// DEL
function delSum (){
let number = document.getElementById("output").value; 
let result = number.slice (0,-1);
document.getElementById("output").value = result;
}
// =
function evaluateSum() {
let y = document.getElementById("output").value;
sum = eval(y); 
document.getElementById("output").value = sum;
if (sum ===undefined) {
document.getElementById("output").value = "";
toggleAllowComma();
}
}