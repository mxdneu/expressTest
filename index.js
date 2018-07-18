var path = require('path')
var fs = require('fs')
var express = require('express')
var app = express()

app.use('/public', express.static(__dirname + '/public'));

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
		})
	}).catch((errorMsg) => {
		res.json({
			isSuccess:false,
		})
	})
})

app.listen('9292', function(err) {
  if (err) throw err
  console.log('server is running')
})