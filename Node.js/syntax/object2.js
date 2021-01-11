var f = function(){
    console.log(1+1);
    console.log(1+2);
}
var a = [f];
a[0](); //JS에서의 함수: 변수취급 가능하며 배열 삽입 또한 가능.

var o = {
    func:f // 이름 : 값
} //객체 (dictionary)

o.func() // 객체 o에서 func -> f (value)