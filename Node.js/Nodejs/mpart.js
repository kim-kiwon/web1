var M = {
    v:'v',
    f:function(){
        console.log(this.v);
    }
}

var B = {
    b:'b',
}
module.exports = M; // 객체 M을 외부에서 사용할 수 있도록 export 하겠다.

module.exports = B; // 객체 B을 외부에서 사용할 수 있도록 export 하겠다.
