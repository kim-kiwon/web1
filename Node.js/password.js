module.exports = {
    id:'egoing',
    password:'111111'
}
//보안 방법.
//템플릿이 읽는 파일명을 절대경로로 넣지말고.
//path.parse.base를 통해 파일명만 넣는다.
//이를 통해 data폴더 내부의 파일만 내용을 출력하게 함으로서 접근을 방지할 수 있다.