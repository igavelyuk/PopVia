$(document).ready(function() {
  var root = "https://blockchain.info/";
  var buttons = $('.blockchain-btn');
  buttons.find('.blockchain').hide();
  buttons.find('.stage-begin').trigger('show').show();
  buttons.each(function(index) {
    var _button = $(this);
    (function() {
      var button = _button;
      button.click(function() {
        var receivers_address = $(this).data('address');
        var test = $(this).data('test');
        button.find('.blockchain').hide();
        button.find('.stage-loading').trigger('show').show();
        button.find('.qr-code').empty();
        function checkBalance() {
          $.ajax({
            type: "GET",
            url: root + 'q/getreceivedbyaddress/' + receivers_address +
              '?start_time=' + (new Date).getTime(),
            data: {
              format: 'plain'
            },
            success: function(response) {
              if (!response) return;
              var value = parseInt(response);
              if (value > 0 || test) {
                button.find('.blockchain').hide();
                button.find('.stage-paid').trigger('show').show().html(button.find('.stage-paid').html().replace('[[value]]', value / 100000000));
              } else {
                setTimeout(checkBalance, 5000);
              }
            }
          });
        }
        try {
          ws = new WebSocket('wss://ws.blockchain.info/inv');
          if (!ws) return;
          ws.onmessage = function(e) {
            try {
              var obj = $.parseJSON(e.data);
              if (obj.op == 'utx') {
                var tx = obj.x;
                var result = 0;
                for (var i = 0; i < tx.out.length; i++) {
                  var output = tx.out[i];
                  if (output.addr == receivers_address) {
                    result += parseInt(output.value);
                  }
                }
              }
              button.find('.blockchain').hide();
              button.find('.stage-paid').trigger('show').show().html(button.find('.stage-paid').html().replace('[[value]]', result / 100000000));
              ws.close();
            } catch (e) {
              console.log(e);
              console.log(e.data);
            }
          };
          ws.onopen = function() {
            ws.send('{"op":"addr_sub", "addr":"' + receivers_address + '"}');
          };
        } catch (e) {
          console.log(e);
        }
        button.find('.stage-ready').trigger('show').show().html(button.find('.stage-ready').html().replace('[[address]]', receivers_address));
        button.find('.qr-code').html('<img style="margin:5px" src="' + root + 'qr?data=' + receivers_address + '&size=125">');
        button.unbind();
        ///Check for incoming payment
        setTimeout(checkBalance, 5000);
      });
    })();
  });
});
// --------------------------------------------------------------------------
<div style="font-size:16px;margin:0 auto;width:300px" class="blockchain-btn"
     data-address="1NMv9Wxv2iGbwXPJo4fciBPeGviToHV1Ku"
     data-shared="false">
    <div class="blockchain stage-begin">
        <img src="https://blockchain.info/Resources/buttons/donate_64.png"/>
    </div>
    <div class="blockchain stage-loading" style="text-align:center">
        <img src="https://blockchain.info/Resources/loading-large.gif"/>
    </div>
    <div class="blockchain stage-ready">
         <p align="center">Please Donate To Bitcoin Address: <b>[[address]]</b></p>
         <p align="center" class="qr-code"></p>
    </div>
    <div class="blockchain stage-paid">
         Donation of <b>[[value]] BTC</b> Received. Thank You.
    </div>
    <div class="blockchain stage-error">
        <font color="red">[[error]]</font>
    </div>
</div>
