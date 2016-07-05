////////////////////////////////////////////////
// bookFile.js

var BOOKDIR = 'D:/dev/blog/monblue.github.io/_draft/txt/'; //상수 config에 등록할 것@@@@@@@@@
var REPFILE = 'D:/dev/blog/monblue.github.io/_draft/_memo/__rep.txt';
var PUBJSDIR = 'D:/dev/blog/monblue.github.io/_apps/_myApps/'; //상수 config에 등록할 것@@@@@@@@@
//var PUBJSDIR = 'D:\\dev\\blog\\monblue.github.io\\_apps\\_myApps\\'; //상수 config에 등록할 것@@@@@@@@@
var PUBJSONDIR = 'json/';
var PUBMKMD = 'makeMd0.js';
//var PUBJSONDIR = './json/'; //상수 config에 등록할 것@@@@@@@@@
//var PUBJSONDIR = '.\\json\\'; //상수 config에 등록할 것@@@@@@@@@
//>node makeMd0.js ./json/md_Healing-Back-Pain.json

//-----------------------------------------------------------------------------
// require
//-----------------------------------------------------------------------------
var express = require('express');
var bodyParser = require('body-parser');  //npm install --save body-parser
var path = require('path');
var http = require('http');
var fs = require('fs');
var exec = require('child_process').exec;


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
  //console.log('viewPage!!!', req);
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


app.get('/publish/:book', function(req, res) {
  //console.log('publish!!!', req);
  console.log(PUBJSDIR + PUBJSONDIR + 'md_' + req.params.book + '.json');
  	var opts = require(PUBJSDIR + PUBJSONDIR + 'md_' + req.params.book + '.json');
	_publish(opts);
	//var Exe2 = 'node ' + PUBMKMD + ' ' + PUBJSONDIR + 'md_' + req.params.book + '.json';
/*
	exec(Exe2, {cwd: PUBJSDIR}, function (error, stdout, stderr) {
	    console.log('stdout: ' + stdout);
	    console.log('stderr: ' + stderr);
	    console.log('Exe1 ' + Exe2);
	    if (error !== null) {
	        console.log('exec error: ' + error);
	    }
	});
*/

});




http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});



//book page 얻기
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


//pulish MD file
var _publish = function(opts) {
	var isRegex = 0;

	var len = opts.split.title.length;
	var nth_;
	var newFile	= [];
	if ( opts.split.doit ) {
		var nameBody = opts.to.path + (opts.to.name || opts.date + '-' + opts.name);
		for (var i=1;i<len+1;i++) {
			nth_ = i;
			if (len > 9 && i < 10) {
				nth_ = '0' + i;
			}

			newFile[i-1] = nameBody + '_' + nth_ + '.' + opts.to.type;
		}
	} else {
		newFile[0]	= opts.to.path + (opts.to.name || opts.date + '-' + opts.name) + '.' + opts.to.type;
	}

	opts.oldFile = opts.from.path + opts.name + '.' + opts.from.type,
	opts.newFile = newFile,
	opts.wordsFile = opts.rep.path + opts.rep.name


	//원본 file 읽기
	fs.readFile(opts.oldFile, 'utf8', function(err, data) {
	    if (err) {
	    	//console.log('err!!!');
	    } else {
	    	//console.log('done it!!!');
			
			//words file 읽기
			fs.readFile(opts.wordsFile, 'utf8', function(err, data1) {
			    if (err) {
			    	console.log('wordsFile read err!!!');
			    } else { //file 변환
					//삭제 부분 처리
					var len = data.match(new RegExp(opts.del.from, 'g')).length;
					for(var i=0;i<len;i++) {
						console.log(len, i, opts.del.from);
		 				data = data.substring(0, data.search(opts.del.from) - 2) + data.substring(data.search(opts.del.to) + opts.del.to.length + 1, data.length);
		 			}

		 			//변환 부분 처리
					data1.trim().split('\r\n').forEach(function(words){
						var aWords = words.split('\t');
						var sOld = new RegExp(aWords[0], 'g');
						data = data.replace(sOld, aWords[1]).replace(/\\\\/g, '\\');
						console.log('word1:' + aWords[0] + 'word2:' + aWords[1]);
					});

					//파일 나누기 여부
					var iSplit = opts.split.doit ? opts.newFile.length : 0;

					var sData = [];
					//var note;
					//if (iSplit > 1) {
					//각주내용 따로 보관
					if (opts.note.view) {
						var note;
						var m = data.search(opts.note.mark2);
						note = data.substring(m, data.length);
						data = data.substring(0, m - 2);
						sData = data.split(opts.split.mark);

						console.log("note.length is" + note.length);					
						var aPosAll = _getPosition({"str": note, "mark": opts.note.mark2});

						var sPos = 0;
						var ePos = 0;
						//var sNote = [];
						var p = 0;
						//var str = ["eeee222eeeee","ee111ee","ee2eee","eeeee222eee22eeee"];
						for (var i=0;i<sData.length;i++) {
							p = p + sData[i].match(new RegExp(opts.note.mark1, 'g')).length;

							ePos = aPosAll[p] || note.length;
							console.log("sData[i].length is" + sData[i].length + " sPos is " + sPos + " / ePos is "+ ePos);
							//sNote[i] = note.substring(sPos, ePos - 2);
							sData[i] += note.substring(sPos, ePos - 2) + '  힣';
							sPos = ePos + 1;

						}

					} else {
						sData = data.split(opts.split.mark);						
					}

					var len = opts.newFile.length || 1;

					for (var i=0;i<len;i++) {
						opts.multi = len;
						opts.nth = i;
						opts.data = sData[i];
						opts.nFile = opts.newFile[i];

						_writeNewMd(opts);
					}


				}
			});

		}
	});
};


var _writeNewMd = function(opts) {
	var data = opts.data;
	var newFile = opts.nFile;
	var multi = opts.multi;
	var nth = opts.nth;

	//var newFile = 'D:\\dev\\blog\\monblue.github.io\\_posts\\2016-06-24-Saam-Acupuncture-System-Essay_1.md';
	console.log(newFile);
	//console.log('data' + data);
	//각주 처리
	if (opts.note.view) {
		var mark1 = opts.note.mark1;
		var mark2 = opts.note.mark2;
		var len = data.match(new RegExp(mark1, 'g')).length;

		for(var i=1;i<len+1;i++) {
	 		//data = data.replace(mark1, ' [^' + i + ']');
	 		//각주 렌더링이 잘 안될 때!!!!
	 		data = data.replace(mark1, '힣<sup id="fnref:' + i + '"><a href="#fn:' + i + '" class="footnote">' + i + '</a></sup>힣');
	 	}

		for(var j=1;j<len+1;j++) {
	 		//data = data.replace(mark2, '[^' + j + ']: ');
	 		//각주 렌더링이 잘 안될 때!!!!
	 		if(j==1) {
	 			data = data.replace(mark2, '힣<div class="footnotes">힣<ol>힣<li id="fn:' + j + '"><p>' + '' + '<a href="#fnref:' + j + '" class="reversefootnote">↩</a></p></li>');
	 		} else {
	 			data = data.replace(mark2, '힣<li id="fn:' + j + '"><p>' + '' + '<a href="#fnref:' + j + '" class="reversefootnote">↩</a></p></li>');	
	 		}
	 		
	 	}
	 	//각주 렌더링이 잘 안될 때!!!!
		data = data.replace(/힣<li id="fn:(\d+)"><p>([^힣]+)<\/a><\/p><\/li>([^힣]+)  힣/g, '<li id="fn:$1"><p>$3</p>$2</a></li>힣');
		data = data + '</ol></div>';
	}
	//추가 부분 처리(header: opts.header.view, )
	var sAdd = "---";
	var a = opts.header.view;
	var title = '';
	var nth_ = (multi > 8 && nth < 9) ? '0' + (nth + 1) : nth + 1;

	for(var i=0;i<a.length;i++) {
		if (multi > 1 && a[i] == 'title') {
			title = opts.header[a[i]];
			opts.header[a[i]] += '(' + nth_ +')  ' + opts.split.title[nth];
			console.log('title' + '(' + nth_ +')  ' + opts.split.title[nth]);
		}
 		sAdd += '힣' + a[i] + ': "' + opts.header[a[i]] + '"';
 	}
 	opts.header['title'] = title;

	sAdd += '힣---힣힣';
	if (opts.header.toc) {
		sAdd += '* content힣{:toc}힣힣';
	}
	data = sAdd  + data;

	//file 쓰기
	//개행문자: '힣', '끟'<-맨마지막에 바꿀 개행문자 html용(각주에 포함된 것 등), 탭문자: '탷'
	fs.writeFile(newFile, data.replace(/힣/g, "\r\n").replace(/끟/g, "<br>\r\n").replace(/탷/g, "\t"), function(err) {
		if (err) {
			console.log('newFile write err!!!');
		} else {
			console.log('\nwrited it!!!\n' + newFile);
		}
	});
}


// 문자열 내에서 특정문자(열) (시작) 위치 모두 반환
var _getPosition = function(opts) {
	var text = opts.str;
	var mark = opts.mark;
	var position = [];
	var pos = text.indexOf(mark);
	
	while(pos > -1) {
    	position.push(pos);
    	pos = text.indexOf(mark, pos + 1);
	}

	return position;
}


// 문자열 내에서 특정문자(열) (시작) 위치 모두 반환
var _getPosition = function(opts) {
	var text = opts.str;
	var mark = opts.mark;
	var position = [];
	var pos = text.indexOf(mark);
	
	while(pos > -1) {
    	position.push(pos);
    	pos = text.indexOf(mark, pos + 1);
	}

	return position;
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



