var path = require('path')
var fs = require('fs')
var express = require('express')
var app = express()

app.use('/public', express.static(__dirname + '/public'));

//允许跨域操作
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.get('/', function(req, res) {
  fs.createReadStream(path.resolve(__dirname, 'index.html'), 'utf8').pipe(res)
})

app.get('/api/testdata',function(req, res){
	var promise = new Promise((resolve, reject) => {
		fs.readFile(path.resolve(__dirname, 'data/testdata.json'), 'utf8', (err, file) => {
			if(err){
				reject('error is error');
			}else{
				resolve(JSON.parse(file));
			}
		})
	})

	promise.then((value) => {
		res.json({
			isSuccess: true,
			data:value
		})
	}).catch((errorMsg) => {
		res.json({
			isSuccess:false,
			data:errorMsg
		})
	})
})

app.listen('9292', function(err) {
  if (err) throw err
  console.log('server is running')
})