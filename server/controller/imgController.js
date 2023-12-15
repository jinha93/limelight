const fs = require('fs');

const img = {};

img.get = async function(req, res) {
    const { imgSrc } = req.query;
    let path = './upload/' + imgSrc;
    fs.readFile(path, (err, data) => {
        res.writeHead(200, {'Context-Type' : 'text/html'});
        res.end(data);
    })
};

module.exports = img;