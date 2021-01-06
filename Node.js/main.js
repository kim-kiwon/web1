var http = require('http');
var fs = require('fs');
var url = require('url'); //url 모듈 사용. url.~~로 사용한다.

var app = http.createServer(function(request,response){
    var _url = request.url; //url 값. 객체로서 _url에 저장.
    var queryData = url.parse(_url, true).query; //url 모듈의 parse함수 사용. 현재 url의 query string 값을 queryData에 저장.

    //console.log(queryData.id); //queryData중 id에 해당하는 값. (id = ???)의 값을 출력.
    
    var pathname = url.parse(_url, true).pathname;
    console.log(url.parse(_url, true));
    
    if(pathname == '/'){
        if(queryData.id === undefined){
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err,description){
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var template = `
            <!doctype html>
            <html>
            <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">WEB</a></h1>
                <ol>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                </ol>
                <h2>${title}</h2>
                <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template); //template을 출력하고 종료
            });
        }
        else
        {
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err,description){
                var title = queryData.id;
                var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    <ol>
                        <li><a href="/?id=HTML">HTML</a></li>
                        <li><a href="/?id=CSS">CSS</a></li>
                        <li><a href="/?id=JavaScript">JavaScript</a></li>
                    </ol>
                    <h2>${title}</h2>
                    <p>${description}</p>
                    </body>
                    </html>
                    `;
                    response.writeHead(200);
                    response.end(template); //template을 출력하고 종료
            });
        }
        
    }
    else {
        response.writeHead(200);
        response.end(template);
    }
    
});
app.listen(3000);