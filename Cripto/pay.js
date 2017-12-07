/************************************
* Project to calculate average time *
* read of the article.              *
* EEC_timeOfRead by EEC             *
************************************/
var Crypto = {
  initCrypto()=>{
    console.log("function initCrypto()");
  }
};
window.onload=function(){
  console.log('Crypto start');
  var paymentObject=new Object(Crypto);
  paymentObject.initCrypto();
  const button=document.getElementById("sendPayment");
  button.addEventListener("click",a.initTFR,false);
}
