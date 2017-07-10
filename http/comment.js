var http = require('http')
var querystring = require('querystring')

var postData = querystring.stringify( {
    'content': '一起期待下一期课程',
    'mid': 8525
})

var options = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/docomment',
	method: 'Post',
	headers: {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding': 'gzip, deflate',
		'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
		'Connection': 'keep-alive',
		'Content-Length': postData.length,
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie': 'PHPSESSID=d3hv88kr33f804ft041b762hj7; imooc_uuid=8e016b1d-9335-40c8-9dbf-1a82a628c987; imooc_isnew_ct=1495354813; loginstate=1; apsid=Y4ZTU2ZGQ1MWIyZTFkYTk4NjQ2Y2YzZGUwZGU5NzYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTg5NDU4MQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4dXNlbl9xaUAxNjMuY29tAAAAAAAAAAAAAAAAAAAAAGQwMmQ3ZTNlZTRiMzdjMzM4ZThlYWM2YWNhMDk4YzAzYmNBWWJjQVk%3DNT; last_login_username=xusen_qi%40163.com; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1495354814; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1497549459; imooc_isnew=2; cvde=59214dbd0e69c-87',
		'Host': 'www.imooc.com',
		'Origin': 'http://www.imooc.com',
		'Referer':'http://www.imooc.com/video/8525/0',
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
		'X-Requested-With': 'XMLHttpRequest'
	}
}

var req = http.request( options ,function(res) {
	console.log('Status:' + res.statusCode)
	console.log('headers:' + JSON.stringify(res.headers))

	res.on('data', function(chunk) {
		console.log( Buffer.isBuffer(chunk))
		console.log( typeof chunk)
	})
	
	res.on('end', function() {
		console.log( '评论完毕')
	})
	
	req.on('error', function(e) {
		console.log( "Error: " + e.message)
	})
})

req.write( postData );
req.end();
