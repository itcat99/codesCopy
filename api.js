const API = 'https://api.ocr.space/parse/imageurl';

const src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495268335685&di=6622f64c7aecc7e9a7228283b27dc643&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F10dfa9ec8a1363270dd94e52928fa0ec08fac79f.jpg';
const res = axios.get(API, {
    params: {
        apikey: '2feae35e4188957',
        url: src
    }
});


res.then((response) => {
    console.log(response);
});