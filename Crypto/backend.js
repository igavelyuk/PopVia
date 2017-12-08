const express = require('express');
const request = require('request');
let app = express()
var backend=()=>{
  // let btcPrice;
  request({
    url: "https://blockchain.info/stats?format=json",
    json: true
  }, function (error, responce, body) {
    btcPrice = body.market_price_usd;
  });
  // console.log("its a alive!")
  app.get("/",(req, res)=>{
    res.send("Current BTC price :" + btcPrice+" $");
  });
  app.listen(8080,function (){
    console.log("Working");
  });
};
module.exports=backend;
