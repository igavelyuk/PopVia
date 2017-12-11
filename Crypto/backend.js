const express = require('express');
const request = require('request');
const bodyparser = require('body-parser')
const bitcore = require('bitcore-lib')
let app = express()
var backend=()=>{
  // let btcPrice;
  app.use(bodyparser.urlencoded({extended:true}));
  app.use(bodyparser.json());
  app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/index.html");
  });
  app.post("/wallet",(req, res)=>{
    let brainsrc = req.body.brainsrc;
    let input = new Buffer(brainsrc);
    let hash = bitcore.crypto.Hash.sha256(input)
    let bn = bitcore.crypto.BN.fromBuffer(hash)
    let pk = new bitcore.PrivateKey(bn).toWIF()
    let addr = new bitcore.PrivateKey(bn).toAddress()
    console.log(brainsrc)
    res.send("Value for generate keys and address"+ brainsrc+"Personal key hash:"+pk+"hash address:"+addr );
  });
            // request({
            //   url: "https://blockchain.info/stats?format=json",
            //   json: true
            // }, function (error, responce, body) {
            //   btcPrice = body.market_price_usd;
            // });

  // console.log("its a alive!")
  app.get("/",(req, res)=>{
    res.send("Current BTC price :" + btcPrice+" $");
  });
  app.listen(8080,function (){
    console.log("Working");
  });
};
module.exports=backend;
