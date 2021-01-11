var o = {
    v1:'v1',
    v2:'v2',
    f1: function(){
        console.log(this.v1); //this = 나 자신.
        //객체 이름이 변경되어도 사용할 수 있도록.
    },
    f2: function(){
        console.log(this.v2);
    }
}
//o 라는 객체 안에 v1 v2 변수. 및 각 변수를 처리하는 함수가 모두 포함됨.
o.f1();
o.f2();

//함수 변수 = 값.
//객체 = 연관된 값들을 저장하는 그릇.