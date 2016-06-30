////////////////////////////////////////////////
// bookFile.js

var BOOKDIR = 'D:/dev/blog/monblue.github.io/_draft/txt/'; //상수 config에 등록할 것@@@@@@@@@
var REPFILE = 'D:/dev/blog/monblue.github.io/_draft/_memo/__rep.txt';
//-----------------------------------------------------------------------------
// require
//-----------------------------------------------------------------------------
var express = require('express');
var bodyParser = require('body-parser');  //npm install --save body-parser
var path = require('path');
var http = require('http');
var fs = require('fs');

//-----------------------------------------------------------------------------
// instantiate
//-----------------------------------------------------------------------------
var app = express();

//-----------------------------------------------------------------------------
// configure: express4이상에서는 변경되어야 함!!!!
//-----------------------------------------------------------------------------
app.set('port', process.env.PORT || 5656);
app.use(bodyParser()); // instruct the app to use the `bodyParser()` middleware for all routes

// Enabling Cross Domain @@@@@@@added by Moon(ref: https://github.com/fernandoperigolo/nodejs-crud/blob/master/app.js)
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//-----------------------------------------------------------------------------
// routing
//-----------------------------------------------------------------------------
/**
 *
 * @caution:
 * @param   object  date
 * @return  string  date[YYYYmmdd]
 */
app.get('/viewPage/:book/:page', function(req, res) {
  console.log('viewPage!!!', req);
	var p = _getPageSE({"book":req.params.book, "page":req.params.page});
  console.log('file', p);

	fs.readFile(p.file, 'utf8', function(err, data) {
  //fs.readFile('d:/dev/mH2/file/yanghan.txt', 'utf8', function(err, data) {
    if (err) console.log('book file read err!!!');
    //console.log(data);
	  res.send(data.substring(data.search(p.sPage), data.search(p.ePage) + p.zpad + 1));
	  res.end();
	});


});


//req.body.titles
app.post('/replace/:book', function(req, res) {
	var book = req.params.book;
	var pat = req.body.pattern;
	var rep = req.body.replace;
	var isRegex = parseInt(req.body.isRegex);

	//var file = './file/' + book + '.txt'
  var file =  BOOKDIR + book + '.txt';

	console.log('pattern replace ', pat, rep, isRegex);

	if (!isRegex) {
		//특수문자 escape000000
		//pat = pat.replace(/(\^|\.|\,|\(|\)|\[|\]|\$|\*|\-)/g, '\\$1');
		var arrChar = ['\\^', '\\.', '\\,', '\\*', '\\+', '\\-', '\\[', '\\]', '\\(', '\\)', '\\?'];
		var len=arrChar.length;
		for (i=0;i<len;i++) {
			sChar = new RegExp(arrChar[i], 'g');
			//pat = pat.replace(sChar, '\\' + arrChar[i]);
			pat = pat.replace(sChar, arrChar[i]);
			console.log('sChar, sRep', sChar, '\\' + arrChar[i]);
			//console.log('sChar, sRep', sChar, '\\' + arrChar[i].substring(1, arrChar[i].length));
		}
		//pat = pat.replace(/(\^)/g, '\\$1');
		console.log('pat', pat);
	} else {
		console.log('pattern', pat);
	}

	var data = {'o':pat, 'r':rep, 'e':isRegex, 'b':book};

	var content = fs.readFileSync(file, 'utf8');
	pat = new RegExp(pat, 'g');
	content = content.replace(pat, rep);

	fs.writeFile(file, content, function(err) {
	  if(err) throw err;
	  console.log('book File write completed');
	    //교정 단어 목록 파일에 저장@@@@@@@@@@@@@
      var rContent = fs.readFileSync(REPFILE, 'utf8');
      rContent += req.body.pattern + "\t" + rep + "\r\n";
      fs.writeFile(REPFILE, rContent, function(err) {
        if(err) throw err;
        console.log('replace words File write completed');
        res.end();
     });
	  res.end();
	});

});


app.post('/savePage/:book/:page', function(req, res) {
	console.log('savePage', req.body.tPage);

	var p = _getPageSE({"book":req.params.book, "page":req.params.page});

  var content = fs.readFileSync(p.file, 'utf8');
	var prevPages = content.substring(0, content.search(p.sPage));
	//var nextPages = content.substring(content.search(p.ePage) + p.zpad + 2, content.length);
  var nextPages = content.substring(content.search(p.ePage) + p.zpad + 1, content.length);
	//var content = prevPages + req.body.tPage + nextPages;

		fs.writeFile(p.file, prevPages + req.body.tPage + nextPages, function(err) {
		  if(err) throw err;
		  console.log('File write completed');
		  res.end();
		});

});



http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});


var _getPageSE = function(options) {
	var book = options.book || 'donggam';
	var page = options.page || 1;
  var zpad = options.zpad || 3;
  var pageTag = options.pageTag || '#';
  //var pageTag = options.pageTag || '`';
  //var file = './file/' + options.book + '.txt';
  var file = BOOKDIR + options.book + '.txt';
  console.log('file is' + file);

	if (book == 'donggam') {
		zpad = 4;
		pageTag = '#';
	}

  var sPage = pageTag + mH_padZero(page, zpad);
  var ePage = pageTag + mH_padZero(parseInt(page) + 1, zpad);

  return {"file":file, "zpad":zpad, "sPage":sPage, "ePage":ePage};
}

//-----------------------------------------------------------------------------
// util functions
//-----------------------------------------------------------------------------
function mH_padZero(n, digits) { //개명예정: hM_padZero
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}
