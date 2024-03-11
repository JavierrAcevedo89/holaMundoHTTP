var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request,response){
    console.log('request', request.url);

    var filepath = '.' + request.url;
    if(filepath == './'){
            filepath = './index.html';
    }

    var extname = String(path.extname(filepath)).toLowerCase();

    var contentType = 'text/html';
    var mimeTypes = {
        '.html' : 'text/html',
        '.js' : 'text/javascript',
        '.css' : 'text/css',
        '.json' : 'application/json',
        '.png' : 'image/png',
        '.jpg' : 'image/jpg',
        '.gif' : 'image/gif',
        '.wav' : 'audio/wav',
        '.mp4' : 'video/mp4',
        '.woff' : 'application/font-woff',
        '.ttf' : 'application/font-ttf',
        '.eot' : 'application/vnd.ms-fontobject',
        '.otf' : 'application/font-otf',
        '.svg' : 'application/image/svg+xml'
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filepath,function(error, content){
        if(error){
            if(error.code == 'ENONET'){
                fs.readFile('./404.html',function(error,content){
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(content,'utf-8');
                });
            }
            else{
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+'..\n');
                response.end();
            }
        }
        else{
            response.writeHead(200, {'Content-Type': contentType});
            response.end(content,'utf-8');
        }
    });
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');