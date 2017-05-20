var express = require('express');
var app = express();

var ak = 'b7d11214c8fc452db3de12028cf46daa';
var sk = '64631fe987f4423bb0a117101bf90a45'
var ocr = require('baidu-ocr-api').create(ak, sk);

app.get('/', function(req, res) {
    const url = req.query.url;
    if (typeof url === 'undefined') return;
    ocr.scan({
        url: url,
        type: 'text',
    }).then(function(result) {
        console.log(result);
        res.send(result.results.words);
    }).catch(function(err) {
        console.log('err', err);
    })
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});