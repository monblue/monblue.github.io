// publish md file from txt file
//!!!usage: $ node makeMd.js ./json/md_Clinical-Important-Medicine.json
var fs = require('fs');
var opts = require(process.argv.slice(2)[0]);

//var name = opts.from.name || opts.date + '-' + opts.name;
//console.log(opts.header.view);
console.log(opts.del.from);

var doIt = function(options) {
	var isRegex = 0;

	//원본 file 읽기
	fs.readFile(options.oldFile, 'utf8', function(err, data) {
	    if (err) {
	    	//console.log('err!!!');
	    } else {
	    	//console.log('done it!!!');
			
			//words file 읽기
			fs.readFile(options.wordsFile, 'utf8', function(err, data1) {
			    if (err) {
			    	console.log('wordsFile read err!!!');
			    } else { //file 변환
					//삭제 부분 처리
					//data.substring(data.search(p.sPage), data.search(p.ePage) + p.zpad + 1);
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

					//각주 처리
					if (opts.note.view) {
						var mark1 = opts.note.mark1;
						var mark2 = opts.note.mark2;
						var len = data.match(new RegExp(mark1, 'g')).length;

						for(var i=1;i<len+1;i++) {
	 					   data = data.replace(mark1, '[^' + i + ']');
	 					}
						for(var i=1;i<len+1;i++) {
	 					   data = data.replace(mark2, '[^' + i + ']: ');
	 					}
					}

					//추가 부분 처리(header: opts.header.view, )
					var sAdd = "---";
					var a = opts.header.view;
					for(var i=0;i<a.length;i++) {
 					   sAdd += '힣' + a[i] + ': "' + opts.header[a[i]] + '"';
 					}

					sAdd += '힣---힣힣';
					if (opts.header.toc) {
						sAdd += '* content힣{:toc}힣힣';
					}
					data = sAdd  + data;

					//file 쓰기
					//개행문자: '힣', 탭문자: '탷'
					fs.writeFile(options.newFile, data.replace(/힣/g, "\r\n").replace(/탷/g, "\t"), function(err) {
						if (err) {
			    			console.log('newFile write err!!!');
			    		} else {
							console.log('\nwrited it!!!\n' + options.newFile);
						}
				    });


				}
			});

		}
	});
};


var options = {
	'oldFile': opts.from.path + opts.name + '.' + opts.from.type,
	'newFile': opts.to.path + (opts.to.name || opts.date + '-' + opts.name) + '.' + opts.to.type,
	'wordsFile': opts.rep.path + opts.rep.name
};

//main Function
doIt(options);