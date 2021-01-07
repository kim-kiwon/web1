/*
function a(){
    console.log('A');
}
*/
var a = function(){
    console.log('A');
} //함수 변수 a.

function slowfunc(callback){
    callback();
} //매개변수로 callback 받음.
//slowfunc 종료되면. 함수변수인 callback이 실행된다.

slowfunc(a);