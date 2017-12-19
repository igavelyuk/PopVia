/*****************************************
 * Project to work with https://gourl.io/ *
 * Pay by EEC for popvia.com              *
 *****************************************/
$(document).ready(function() {


$('#sendPayment').addClass('disabled');

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

      var firstCheck = $('#amount').val();
      var secondCheck = $('#amountBTC').val();
      var thirdCheck  = $('#privateKeyMain').val();


      console.log(x);
      console.log(firstCheck);
      console.log(secondCheck);
      console.log(thirdCheck.length+"---------");
      if(firstCheck>10&&thirdCheck.length>63){
        $('#sendPayment').removeClass("disabled");
      }else{
        $('#sendPayment').addClass('disabled');
      }
    });



// var classList = $('#divId').attr('class').split(/\s+/);
// $.each(classList, function(index, item) {
//     if (item === 'someClass') {
//         //do something
//     }
// });


// }else if(thirdCheck.lenght>=64){
//   $('#sendPayment').removeClass('disabled');
// }else{
//   if(firstCheck>10&&secondCheck.lenght>6){
//     $('#sendPayment').removeClass('disabled');
//   }
// }


});
// essence
// http://blockchatin.info/stats?format=json
// {
//   "market_price_usd": 15435.86,
//   "hash_rate": 12099839026.66,
//   "total_fees_btc": 61380609027,
//   "n_btc_mined": 191250000000,
//   "n_tx": 393562,
//   "n_blocks_mined": 153,
//   "minutes_between_blocks": 8.84,
//   "totalbc": 1672826250000000,
//   "n_blocks_total": 498261,
//   "estimated_transaction_volume_usd": 5129438989.13,
//   "blocks_size": 161133340,
//   "miners_revenue_usd": 38995711.33,
//   "nextretarget": 499967,
//   "difficulty": 1590896927258,
//   "estimated_btc_sent": 33230661817935,
//   "miners_revenue_btc": 2526,
//   "total_btc_sent": 265304405463756,
//   "trade_volume_btc": 276825.93,
//   "trade_volume_usd": 4273046864.11,
//   "timestamp": 1512755936000
// }
var Crypto = {
  initCrypto: () => {
    var that = this;
    // Get position and fill required data fields
    // $.getJSON("https://blockchain.info/stats?format=json&callback=?",function(data,status,xhr){
    //   // that.status="connection ok <br> current market_price_usd<br>"
    //   // data.market_price_usd
    //   console.log(data);
    //   $("#infoBlock1").text(data.market_price_usd);
    //   });

    // var xhttp
    //   xhttp = new XMLHttpRequest()
    //   xhttp.onreadystatechange = function () {
    //     if (this.readyState === 4 && this.status === 200) {
    //       let tgeo = JSON.parse(this.responseText)
    //       console.log(tgeo + 'JSON.parse')
    //       $("#infoBlock1").text(tgeo)
    //     }
    //   }
    //   xhttp.withCredentials = true;
    //   xhttp.open('GET',"https://blockchain.info/stats?format=json", true)
    //   xhttp.send()
    //var idiom=$("#infoBlock1").val();
              // $.ajax({
              //   type: "GET",
              //   url: 'https://blockchain.info/stats',
              //   data: {
              //     format: 'json&callback=?'
              //   },
              //   async: true,
              //   dataType: 'jsonp', //you may use jsonp for cross origin request
              //   crossDomain: true,
              //   success: function(data, status, xhr) {
              //     console.log(this.status);
              //     console.log(this.xhr);
              //     console.log(this.data);
              //     // $("#infoBlock1").val(data);
              //     //alert(xhr.getResponseHeader('Host'));
              //   }
              // });

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
