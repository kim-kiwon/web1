var http = require('http');
var fs = require('fs');
var url = require('url'); //url 모듈 사용. url.~~로 사용한다.
var qs = require('querystring');

function templateHTML(title, list, body, control){
    return  `
    <!doctype html>
    <html>
    <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
    </body>
    </html>
        `;
}

function templateList(filelist){
    var list = '<ul>'; 
    for(i = 0; i < filelist.length; i++){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    }
    list = list + '</ul>';
    return list;
}
var app = http.createServer(function(request,response){
    var _url = request.url; //url 값. 객체로서 _url에 저장.
    var queryData = url.parse(_url, true).query; //url 모듈의 parse함수 사용. 현재 url의 query string 값을 queryData에 저장.

    //console.log(queryData.id); //queryData중 id에 해당하는 값. (id = ???)의 값을 출력.
    
    var pathname = url.parse(_url, true).pathname;
    
    // 홈 + 자식 링크
    if(pathname == '/'){

        //메인 화면.(홈)
        if(queryData.id === undefined){
            
            fs.readdir('./data', function(error, filelist){
                var title = 'Welcome';
                var list = templateList(filelist);
                var description = 'Hello, Node.js';
                var template = templateHTML(title, list, `<h2>${title}</h2>${description}`, 
                `<a href="/create">create</a>`
                );
                response.writeHead(200);
                response.end(template); //template을 출력하고 종료
            })
        }
        //CSS ,HTML ,Javascript로의 링크.
        else
        {
            fs.readdir('./data', function(error, filelist){
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err,description){
                    var title = queryData.id;
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>  
                    <a href="/update?id=${title}">update</a>
                    <form action="delete_process" method="post">
                        <input type="hidden" name="id" value="${title}">
                        <input type="submit" value="delete">
                    `);
                    //각 페이지에서 수정을 누를시 각 페이지 수정 링크로 이동.
                        response.writeHead(200);
                        response.end(template); //template을 출력하고 종료
                    });
            });
        }
        
    }

    // /create : 파일 create 링크. 파일생성
    else if(pathname === '/create'){
        fs.readdir('./data', function(error, filelist){
            var title = 'WEB - Create';
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
                <form action="/create_process" method = "post">
                <p><input type = "text" name = "title" placeholder="title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type = "submit">
                </p>
                </form>
        `, '');
            response.writeHead(200);
            response.end(template); //template을 출력하고 종료
        })
    }

    //Post데이터 입력받는 부분.
    else if(pathname === '/create_process'){
        //post방식으로 데이터 처리
        var body = '';
        request.on('data', function(data){
            body += data;
            //Post 시마다 호출. callback 실행시마다 body에 data추가. 
        });
        request.on('end', function(){
            //post 입력이 끝. 입력을 변수로 저장.
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description
            
            //Post로 입력된 것을 data에 파일로 저장.
            //function은 콜백함수.
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                response.writeHead(302, {Location: `/?id=${title}`});
                //302: redirection 으로 해당 링크로 이동.
                response.end(); 
            })
        });
        
    }

    else if(pathname === '/update')
    {
        fs.readdir('./data', function(error, filelist){
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err,description){
                var title = queryData.id;
                var list = templateList(filelist);
                var template = templateHTML(title, list, 
                `
                <form action="/update_process" method = "post">
                <input type = "hidden" name = "id" value = "${title}"> 
                <p><input type = "text" name = "title" placeholder="title" value = ${title}></p>
                <p>
                    <textarea name="description" placeholder="description">${description}</textarea>
                </p>
                <p>
                    <input type = "submit">
                </p>
                </form>
                `,
                `<a href="/create">create</a>  <a href="/update?id=${title}">update</a>`);
                //각 페이지에서 수정을 누를시 각 페이지 수정 링크로 이동.
                    response.writeHead(200);
                    response.end(template); 
                });
        });
    }
    else if(pathname === '/update_process')
    {
        var body = '';
        request.on('data', function(data){
            body += data;
            //Post 시마다 호출. callback 실행시마다 body에 data추가. 
        });
        request.on('end', function(){
            //post 입력이 끝. 입력을 변수로 저장.
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description
            fs.rename(`data/${id}`, `data/${title}`, function(error){
                fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                    response.writeHead(302, {Location: `/?id=${title}`});
                    //302: redirection 으로 해당 링크로 이동.
                    response.end(); 
                })
            });
        });
    }

    else if(pathname === '/delete_process')
    {
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            //post 입력이 끝. 입력을 변수로 저장.
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${id}`, function(err){
                response.writeHead(302, {Location: `/`});
                response.end(); 
            })
        });
    }

    // 안만든 페이지로 이동시 처리
    else {
        response.writeHead(200);
        response.end('Not found');
    }
});
app.listen(3000);