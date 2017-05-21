let express = require('express');
let bodyParser = require('body-parser');
let tesseract = require('./libs/tesseract.js');

let app = express();
let jsonParser = bodyParser.json();

function scan(url, callback) {
    tesseract.recognize(`"${url}"`)
        .progress(p => {
            console.log('progress', p);
        })
        .then((result) => {
            callback(result);
        }).catch((err) => {
            console.log('err', err);
        });
}

app.post('/', jsonParser, (req, res) => {
    const url = req.body.url;
    console.log(typeof url);

    if (typeof url === 'undefined') return;

    scan(url, (result) => {
        console.log(result);
        // res.send(result.results.words);
    });
});

let server = app.listen(3001, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});