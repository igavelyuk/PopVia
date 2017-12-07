/*****************************************
* Project to work with https://gourl.io/ *
* Pay by EEC for popvia.com              *
*****************************************/
var Crypto = {
  status: 'payment_not_received',
  err: '',
  public_key: '20AAvZCcgBitcoin77BTCPUB0xyyeKkxMUmeTJRWj7IZrbJ0oL',
  box: '20',
  boxtype: 'paymentbox',
  order: 'invoice22',
  user: '102671958__9ffd317053',
  userformat: 'COOKIE',
  usercountry: '',
  period: '',
  amount: '0.00023998',
  amountusd: '3.11',
  wallet_url: 'bitcoin:1FvJPe8un1qHRYePGYQPWHZTwqQhC2zo4h?amount=0.00023998&amp;label=Payment',
  coinlabel: 'BTC',
  coinname: 'Bitcoin',
  addr: '1FvJPe8un1qHRYePGYQPWHZTwqQhC2zo4h',
  tx: "",
  tx_url: "",
  confirmed: "0",
  timestamp: "",
  date: "",
  datetime: "",
  json: "1",// currency data section
  ip_addr:'',
  code:'',
  country:'',
  city:'',
  posX:'',
  posY:'',
  initCrypto: ()=>{
    var that=this;
    // Get position and fill required data fields
    $.getJSON("https://freegeoip.net/json/",function(data,status,xhr){
      that.ip_addr=data.ip;//http://freegeoip.net/json/
      that.code=data.country_code;
      that.country=data.country_name;
      that.city=data.region_name;
      that.posX=data.latitude;
      that.posY=data.longitude;
			});
      console.log(this.ip_addr+" "+this.code+" "+this.country+" "+this.city+" "+this.posX+" "+this.posY);
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
    // console.log("function initCrypto()");
  },
  sendPayment:()=>{
    // console.log("function sendPayment()");
  }
};
window.onload=function(){
  console.log('Crypto start');
  var paymentObject=new Object(Crypto);
  paymentObject.initCrypto();

  const button=document.getElementById("sendPayment");
  button.addEventListener("click",paymentObject.sendPayment,false);
}
