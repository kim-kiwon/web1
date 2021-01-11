//module에 대해서.

// var M = {
//     v:'v',
//     f:function(){
//         console.log(this.v);
//     }
// }

var part = require('./mpart.js') //mpart의 모듈을 가져오겠다.

//export한 마지막 객체만 require할때 가져오게 된다.

console.log(part.b)