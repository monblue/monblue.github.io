// publish md file from txt file(주석 [^#] 형식)
//!!!usage: $ node makeMd.js ./json/md_Clinical-Important-Medicine.json
var fs = require('fs');
var opts = require(process.argv.slice(2)[0]);

//var name = opts.from.name || opts.date + '-' + opts.name;
//console.log(opts.header.view);
//console.log(opts.del.from);

var doIt = function(options) {
	var isRegex = 0;

	//원본 file 읽기
	fs.readFile(options.oldFile, 'utf8', function(err, data) {
	    if (err) {
	    	console.log('source file read err!!!');
	    } else {
	    	console.log(options.oldFile + 'is read!!!');
			
			//words file 읽기
			fs.readFile(options.wordsFile, 'utf8', function(err, data1) {
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
					var iSplit = opts.split.doit ? options.newFile.length : 0;

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

					var len = options.newFile.length || 1;

					for (var i=0;i<len;i++) {
						opts.multi = len;
						opts.nth = i;
						opts.data = sData[i];
						opts.nFile = options.newFile[i];

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
	 		data = data.replace(mark1, ' [^' + i + ']');
	 	}

		for(var j=1;j<len+1;j++) {
	 		data = data.replace(mark2, '[^' + j + ']: ');	 		
	 	}

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



var options = {
	'oldFile': opts.from.path + opts.name + '.' + opts.from.type,
	'newFile': newFile,
	'wordsFile': opts.rep.path + opts.rep.name
};


//main Function
doIt(options);