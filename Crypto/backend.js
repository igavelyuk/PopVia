const express = require('express');
const request = require('request');
const bodyparser = require('body-parser')
const bitcore = require('bitcore-lib')
let Insight = require('bitcore-explorers').Insight
const key = require('./securityKeys')
let app = express()

var send = (privateKey, sendAddr, receiveAddr, quantity) => { //adresses in string format
	privateKey = new bitcore.PrivateKey(privateKey,'testnet');
	receiveAddr = new bitcore.Address(receiveAddr,'testnet');
	sendAddr = privateKey.toAddress();
  let insight = new Insight('testnet');
	insight.getUnspentUtxos(sendAddr, function(err, utxos) {
    var serializedStr;
		if (err) {
			console.log(err);
		} else {
			var tx = bitcore.Transaction();
			tx.from(utxos); // get global payment object
			tx.to(receiveAddr, quantity); // take amought
			tx.change(sendAddr); // reorder amounght to this address
			tx.sign(privateKey); // confirm transaction
			serializedStr = tx.serialize(); // not mentioned in documentation or I missed it
      // you must broadcast string
			// console.log(serializedStr);
			insight.broadcast(serializedStr, function(err, txId) {
				if (err) {
					console.log('Error!:'+err);
				} else {
					console.log('Successfully sent: '+txId);
				}
			});
		}
	});
}
function getWalletQuant(srvURL, currAddr){
	srvURL = "https://blockchain.info/balance?active=";
  request({
    url: srvURL + currAddr,
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
function getExchangeRate(srvURL){
	srvURL = "https://blockchain.info/stats?format=json";
  request({
    // total_received
    // stats
    url: srvURL,
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
  getExchangeRate();
  app.use(express.static(__dirname + '/static'));
  app.set('view engine', 'ejs')
  app.get("/",(req, res)=>{
    res.render("main",{showPrice:btcPrice,cBallance:currA});
  });
  app.post("/transaction",(req, res)=>{
    //console.log(req.body.donationWalletPublicKey)
    console.log(req.body.privateKeyMain) //
    console.log(req.body.sendAddrMain)
		console.log(req.body.receiveAddrMain)
		console.log(req.body.amount) //  
		console.log(req.body.amountBTC)
		console.log('Completed -------------')
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
  app.get("/error",(req, res)=>{
    //console.log(req.body.donationWalletPublicKey)
    console.log(req.body.yourWalletPublicKey)
    console.log(req.body.yourWalletPrivateKey)
    app.use(express.static(__dirname + '/static'));
    app.set('view engine', 'ejs')
    res.render("error");
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
