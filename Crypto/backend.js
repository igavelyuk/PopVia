const express = require('express');
const request = require('request');
const bodyparser = require('body-parser')
const bitcore = require('bitcore-lib')
const btcReq = require('bitcore-request')
const Insight = require('bitcore-explorers').Insight

const key = require('./securityKeys')
let app = express()
var testnetPK='cTqrh37MoKmNrk1kxGRs5sMYsnXiCLQ5XgVB6eKthmSbxnQ5JiQu';
function receive(){

}
function createNewKey(){
  let randomBuffer = bitcore.crypto.Random.getRandomBuffer(32)
  let randomNumber = bitcore.crypto.BN.fromBuffer(randomBuffer)
  let address = new bitcore.PrivateKey(randomNumber).toAddress('testnet')
  // for generate address in memory .toAddress() on the server .toAddress('servername')
  // 'mzHND2txx6CVL2kicbS4Q1MQDKD71oeukr'
  // bitcore.PrivateKey('testnet').toWIF()
  // 'cTLdCAH6FB4pETy4EUESi1EoEdv974ETKGrvVWdeCvbn3okAspD8'
  let privateKeyWIF = 'cTLdCAH6FB4pETy4EUESi1EoEdv974ETKGrvVWdeCvbn3okAspD8'
  // backward translation
  let privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF)
  // let privateKey = bitcore.PrivateKey.fromWIF('cTLdCAH6FB4pETy4EUESi1EoEdv974ETKGrvVWdeCvbn3okAspD8')
  let addressTwo = privateKey.toAddress()
  // let addressTwo = privateKey.toAddress()
  // console.log(addressTwo); 'n23iqtgwjkdxy5SfRBHFdxtfiHBy3ioAJS'
  // going to testnet - https://testnet.manu.backend.hamburg/faucet
// API RECEIVE
  // Sent! TX ID: af71ab0002644f8624fb5acdd6f99dad63ec93bd904376cac4741c562e61560c
//--------------------------------------------------------------------------------------
let randomBuffer2 = new Buffer('azaza celui pipisku')
let randomHash = bitcore.crypto.Hash.sha256(randomBuffer2)
let randomNumber2 = bitcore.crypto.BN.fromBuffer(randomHash)
let address2 = new bitcore.PrivateKey(randomNumber2,'testnet').toAddress()
// address2 = mjrkPLtquuuq6h3CN7P5AKbXUukJRvuaoM
// for generate address in memory .toAddress() on the server .toAddress('servername')
// 'mzHND2txx6CVL2kicbS4Q1MQDKD71oeukr'
// bitcore.PrivateKey('testnet').toWIF()
// 'cTLdCAH6FB4pETy4EUESi1EoEdv974ETKGrvVWdeCvbn3okAspD8'
let privateKeyWIF = 'cTLdCAH6FB4pETy4EUESi1EoEdv974ETKGrvVWdeCvbn3okAspD8'
// backward translation
let privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF)
// let privateKey = bitcore.PrivateKey.fromWIF('cTLdCAH6FB4pETy4EUESi1EoEdv974ETKGrvVWdeCvbn3okAspD8')
let addressTwo = privateKey.toAddress()

  return address
}
function checkBallance(){
let insight = new Insight('testnet')
insight.getUnspentUtxos(address, function (res, utxos){
  if(err){
    // catch errors here
  }else{
    // Use utxos to  create transmission
    console.log(utxos)
  }
})
//---------------------------------
/**************************************
insight.getUnspentUtxos('mzHND2txx6CVL2kicbS4Q1MQDKD71oeukr', function (res, utxos){
  if(err){
    // catch errors here
  }else{
    // Use utxos to  create transmission
    console.log(utxos)
  }
})
***************************************/

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
