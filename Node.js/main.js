var http = require('http');
var fs = require('fs');
var url = require('url'); //url 모듈 사용. url.~~로 사용한다.
var qs = require('querystring');

function templateHTML(title, list, body){
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
        <a href="/create">create</a>
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
    
    if(pathname == '/'){
        if(queryData.id === undefined){
            
            fs.readdir('./data', function(error, filelist){
                var title = 'Welcome';
                var list = templateList(filelist);
                var description = 'Hello, Node.js';
                var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                response.writeHead(200);
                response.end(template); //template을 출력하고 종료
            })
        }
        else
        {
            fs.readdir('./data', function(error, filelist){
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err,description){
                    var title = queryData.id;
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                        response.writeHead(200);
                        response.end(template); //template을 출력하고 종료
                    });
            });
        }
        
    }
    else if(pathname === '/create'){
        fs.readdir('./data', function(error, filelist){
            var title = 'WEB - Create';
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
                <form action="http://localhost:3000/create_process" method = "post">
                <p><input type = "text" name = "title" placeholder="title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type = "submit">
                </p>
                </form>
        `);
            response.writeHead(200);
            response.end(template); //template을 출력하고 종료
        })
    }

    else if(pathname === '/create_process'){
        //post방식으로 데이터 처리
        var body = '';
        request.on('data', function(data){
            body += data;
            //Post 시마다 호출. callback 실행시마다 body에 data추가. 
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = pos.description
            //post 입력이 끝나면. 해당 입력을 변수로 저장하는단계.
        });
        response.writeHead(200);
        response.end('success'); //template을 출력하고 종료
    }
    else {
        
        response.writeHead(200);
        response.end('Not found');
    }
    
});
app.listen(3000);