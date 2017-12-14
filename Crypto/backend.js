const express = require('express');
const request = require('request');
const bodyparser = require('body-parser')
const bitcore = require('bitcore-lib')
const key = require('./securityKeys')
let app = express()

function receive(){

}
function send(){

}
function update(){

}
function getWalletQuant(currAddr){
  request({
    url: "https://blockchain.info/balance?active="+currAddr,
    json: true
  }, function (error, responce, body) {
    // body.final_balance
    // body.n_tx
    currA = body.final_balance;
    if(currA==='undefined')currA=0;
    currA=parseInt(currA);
    currB = body.n_tx;
    if(currB==='undefined')currB=0;
    currB=parseInt(currB);
    currC = body.total_received;
    if(currC==='undefined')currC=0;
    currC=parseInt(currC);
    console.log(toString(currA));
  });
}
function getExchange(){
  request({
    // total_received
    // stats
    url: "https://blockchain.info/stats?format=json",
    json: true
  }, function (error, responce, body) {
    btcPrice = body.market_price_usd;
  });
}
var backend=()=>{
  // console.log(key.publicKey);
  // let btcPrice;
  app.use(bodyparser.urlencoded({extended:true}));
  app.use(bodyparser.json());
  // app.get("/",(req, res)=>{
  //   res.sendFile(__dirname+"/main.html");
  // });
  // app.post("/wallet",(req, res)=>{
  getWalletQuant(key.userAddress)
  getExchange();
  app.use(express.static(__dirname + '/static'));
  app.set('view engine', 'ejs')
  app.get("/",(req, res)=>{
    res.render("main",{showPrice:btcPrice,cBallance:currA});
  });
/****************************
donationWaletPublicKey
yourWalletPublicKey
yourWalletPrivateKey
****************************/

  app.post("/transaction",(req, res)=>{
    //console.log(req.body.donationWalletPublicKey)
    console.log(req.body.yourWalletPublicKey)
    console.log(req.body.yourWalletPrivateKey)
    app.use(express.static(__dirname + '/static'));
    app.set('view engine', 'ejs')
    res.render("transaction");
    // let brainsrc = req.body.brainsrc;
    // let input = new Buffer(brainsrc);
    // let hash = bitcore.crypto.Hash.sha256(input)
    // let bn = bitcore.crypto.BN.fromBuffer(hash)
    // let pk = new bitcore.PrivateKey(bn).toWIF()
    ////  let addr = new bitcore.PrivateKey(bn).toAddress()
    // console.log(brainsrc)
    // res.send("Value for generate keys and address"+ brainsrc+"Personal key hash:"+pk+"hash address:"+addr );
  });

  // console.log("its a alive!")
  // app.get("/",(req, res)=>{
  //   res.send("Current BTC price :" + btcPrice+" $");
  // });
  app.listen(8080,function (){
    console.log("Working");
  });
};
module.exports=backend;
