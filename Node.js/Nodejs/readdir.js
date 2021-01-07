//디렉토리의 파일 목록 리스트에 저장.
var testFolder = './data';
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
    console.log(filelist);
})