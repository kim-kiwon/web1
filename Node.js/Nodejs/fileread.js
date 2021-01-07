//텍스트 파일 읽어와 저장.
var fs = require('fs');
fs.readFile('sample.txt','utf8',function(err, data) {
    console.log(data);
});