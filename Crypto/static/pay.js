/*****************************************
 * Project to work with                   *
 * Pay by EEC for popvia.com              *
 *****************************************/
$(document).ready(function() {
$('#sendPayment').addClass('disabled');
$('input#privateKeyMain').keyup(()=>SecurityCheck());
  $('#Anon')
  .click(function() {
    let anonValue = $(this).val();
    if(anonValue==="on"){
      $('#anonLabel').text('Click "check" to be Anonymous');
      $('#regFields').toggleClass("class-hidden");
      $(this).val("off");
    }else{
      $('#anonLabel').text('Click "uncheck" for Register');
      $('#regFields').toggleClass("class-hidden");
      $(this).val("on");
    }
  });
  var showPriceVar = $('#showPrice').text();
  var x = $('input#privateKeyMain').characterCounter();
  $('input#amount')
    .change(function() {
      let value = $(this).val();
      value = parseFloat(value);
      value = value.toFixed(2) / parseFloat(showPriceVar);
      console.log(value);
      $('input#amountBTC').val(value.toFixed(8));
      SecurityCheck();
    });
});

var SecurityCheck = () => {
  var firstCheck = $('#amount').val();
  var secondCheck = $('#amountBTC').val();
  var thirdCheck  = $('#privateKeyMain').val();
  // console.log(x);
  // console.log(firstCheck);
  // console.log(secondCheck);
  // console.log(thirdCheck.length+"---------");
  if(firstCheck>10&&thirdCheck.length==64){ // == 64 test
    $('#sendPayment').removeClass("disabled");
  }else{
    $('#sendPayment').addClass('disabled');
  }
}
var Crypto = {
  initCrypto: () => {
    var that = this;
    // $.getJSON("https://freegeoip.net/json/",function(data,status,xhr){
    //   that.ip_addr=data.ip;//http://freegeoip.net/json/
    //   that.code=data.country_code;
    //   that.country=data.country_name;
    //   that.city=data.region_name;
    //   that.posX=data.latitude;
    //   that.posY=data.longitude;
    //   $("#infoBlock").text(that.ip_addr+","+that.code+","+that.country+","+that.city);
    // 	});
    //  console.log(this.ip_addr+" "+this.code+" "+this.country+" "+this.city+" "+this.posX+" "+this.posY);
    // ip	"78.26.151.253"
    // country_code	"UA"
    // country_name	"Ukraine"
    // region_code	"51"
    // region_name	"Odessa"
    // city	"Odesa"
    // zip_code	""
    // time_zone	"Europe/Kiev"
    // latitude	46.4639
    // longitude	30.7386
    // metro_code	0
  },
  sendPayment: () => {

  }
};
window.onload = function() {
  console.log('Crypto start');
  var paymentObject = new Object(Crypto);
  paymentObject.initCrypto();
  const button = document.getElementById("sendPayment");
  button.addEventListener("click", paymentObject.sendPayment, false);
}
