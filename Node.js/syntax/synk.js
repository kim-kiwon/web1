var fs = require('fs');

/*
//readFileSync. 동기적으로 읽기(직렬).
//ABC순 출력.
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

//readFile. 비동기적로 읽기(병렬)
//병렬적으로 읽어. ACB순 출력.
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
    //readfile 이용해서 읽어와. 시간이 걸리니까. 작업이 끝나면 세번째 인자인 함수를 호출해. Callback(파일을 읽은다음에 후에 실행해)
});
console.log('C');