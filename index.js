var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var ak = 'b7d11214c8fc452db3de12028cf46daa';
var sk = '64631fe987f4423bb0a117101bf90a45'
var ocr = require('baidu-ocr-api').create(ak, sk);
var jsonParser = bodyParser.json();

function scan(url, callback) {
    ocr.scan({
        url: url,
        type: 'text',
    }).then(function(result) {
        callback(result);
    }).catch(function(err) {
        console.log('err', err);
    })
}
app.post('/', jsonParser, function(req, res) {
    const url = req.body.url;
    if (typeof url === 'undefined') return;

    scan(url, (result) => {
        res.send(result.results.words);
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});