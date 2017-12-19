// // var bitcore = require('bitcore')
// // const btcReq = require('bitcore-request')
// var bitcore = require('bitcore-lib')
// let Insight = require('bitcore-explorers').Insight
//
// var sendBTC = function (SenderPrivateKey, SenderAddress, ReceiverAddress, Amount) //adresses in string format
// {
// 	SenderPrivateKey = new bitcore.PrivateKey(SenderPrivateKey,'testnet');
// 	ReceiverAddress = new bitcore.Address(ReceiverAddress,'testnet');
// 	SenderAddress = SenderPrivateKey.toAddress();
// 	console.log(SenderPrivateKey);
// 	console.log(SenderAddress);
// 	console.log(ReceiverAddress);
//
//   // let Insight = require('bitcore-explorers').Insight
//   let insight = new Insight('testnet');
// 	insight.getUnspentUtxos(ReceiverAddress, function(err, utxos) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log(utxos);
// 		}
// 	});
// }
// // (SenderPrivateKey, SenderAddress, ReceiverAddress, Amount
// sendBTC('abc8611f89f897da6b3231c58e4813bd1a373ba3f1719a9cc139e4b5d0dc9f48','n23iqtgwjkdxy5SfRBHFdxtfiHBy3ioAJS','mzHND2txx6CVL2kicbS4Q1MQDKD71oeukr',0)
const express = require('express');
const request = require('request');
const bodyparser = require('body-parser')
const bitcore = require('bitcore-lib')

function getWalletQuant(currAddr){
	console.log('starting .......');
  request({
    url: "https://blockchain.info/balance?active="+currAddr,
    json: true
  }, function (error, responce, body) {
    // body.final_balance
    // body.n_tx
    currA = body.final_balance;
    if(currA==='undefined')currA=0;
    currA=parseInt(currA);
		console.log(toString(currA));
    currB = body.n_tx;
    if(currB==='undefined')currB=0;
    currB=parseInt(currB);
		console.log(toString(currB));
    currC = body.total_received;
    if(currC==='undefined')currC=0;
		currB=parseInt(currC);
    console.log(toString(currC));
  });
	console.log('completed .......');
}
getWalletQuant('n23iqtgwjkdxy5SfRBHFdxtfiHBy3ioAJS');
