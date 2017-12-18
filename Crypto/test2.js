// var bitcore = require('bitcore')
// const btcReq = require('bitcore-request')
var bitcore = require('bitcore-lib')
let Insight = require('bitcore-explorers').Insight

var send = (SenderPrivateKey, SenderAddress, ReceiverAddress, Amount) => { //adresses in string format
	SenderPrivateKey = new bitcore.PrivateKey(SenderPrivateKey,'testnet');
	ReceiverAddress = new bitcore.Address(ReceiverAddress,'testnet');
	SenderAddress = SenderPrivateKey.toAddress();
	console.log(SenderPrivateKey);
	console.log(SenderAddress);
	console.log(ReceiverAddress);

  // let Insight = require('bitcore-explorers').Insight
  let insight = new Insight('testnet');
	insight.getUnspentUtxos(SenderAddress, function(err, utxos) {
    var serializedStr;
		if (err) {
			console.log(err);
		} else {
			var tx = bitcore.Transaction();
			tx.from(utxos);
			tx.to(ReceiverAddress, 800000);
			tx.change(SenderAddress);
			tx.sign(SenderPrivateKey);
			serializedStr = tx.serialize(); // not mentioned in documentation
			console.log(serializedStr);
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
// (SenderPrivateKey, SenderAddress, ReceiverAddress, Amount
send('abc8611f89f897da6b3231c58e4813bd1a373ba3f1719a9cc139e4b5d0dc9f48','n23iqtgwjkdxy5SfRBHFdxtfiHBy3ioAJS','mzHND2txx6CVL2kicbS4Q1MQDKD71oeukr',0)
