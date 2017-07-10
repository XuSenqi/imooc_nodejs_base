var http = require('http');
var querystring = require('querystring');

//var contents = querystring.stringify({
//    name: 'byvoid',
//    email: 'byvoid@byvoid.com',
//    address: 'Zijing 2#, Tsinghua University',
//});
//var options = {
//    host: 'www.byvoid.com',
//    path: '/application/node/post.php', method: 'POST',
//    headers: {
//        'Content-Type': 'application/x-www-form-urlencoded',
//        'Content-Length' : contents.length
//    }
//};
//var req = http.request(options, function(res) { 
//    res.setEncoding('utf8');
//    res.on('data', function (data) {
//        console.log(data);
//    });
//});
//req.write(contents);
//req.end();

//http.get({host: 'http://www.byvoid.com'}, function(res) { 
http.get('http://www.imooc.com/learn/348', function(res) { 
    res.on('data', function (data) {
        console.log(data);
    });
    res.setEncoding('utf8');
    //res.on('data', function (data) {
    //    console.log(data);
    //});
});

/*****************************************/
//var options = {
//  hostname: 'www.google.com',
//  port: 80,
//  path: '/upload',
//  method: 'POST'
//};
//
//var req = http.request(options, function(res) {
//  console.log('STATUS: ' + res.statusCode);
//  console.log('HEADERS: ' + JSON.stringify(res.headers));
//  res.setEncoding('utf8');
//  res.on('data', function (chunk) {
//    console.log('BODY: ' + chunk);
//  });
//});
//
//req.on('error', function(e) {
//  console.log('problem with request: ' + e.message);
//});
//
//// write data to request body
//req.write('data\n');
//req.write('data\n');
//req.end();
