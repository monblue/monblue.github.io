// orignal_file을 치환파일내용으로 치환
//!!!usage: $ node replaceBook.js test.txt [orignal_file] [치환내용파일]
//usage: $ node replaceBook.js test.txt [orignal_file] [destinate_file] [치환내용파일] [치환방법]
//usage: $ node replaceBook.js
var fs = require('fs');
var myArgs = process.argv.slice(2);

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
			    	//data = data.replace(/\r\n/g, '');
					data1.trim().split('\r\n').forEach(function(words){
						var aWords = words.split('\t');
						//var sOld = new RegExp(aWords[0].trim(), 'g');
						var sOld = new RegExp(aWords[0], 'g');
						data = data.replace(sOld, aWords[1]).replace(/\\\\/g, '\\');
						console.log('word1:' + aWords[0] + 'word2:' + aWords[1]);
					});


/*
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
*/
					//file 쓰기
					//개행문자: '힣'
					//탭문자: '탷'
					fs.writeFile(options.newFile, data.replace(/힣/g, "\r\n").replace(/탷/g, "\t"), function(err) {
						if (err) {
			    			//console.log('newFile write err!!!');
			    		} else {
							//console.log('\nwrited it!!!\n' + data);
						}
				    });		
				}
			});

		}
	});
};


//파일 이름, 확장자 구하기
var _getNameExt = function(fileName) {
  	var arrName = fileName.split('.');
  	var len = arrName.length;
  	var fileName = '';
  	for(var i=0;i<len-1;i++) {
  		//console.log('arr ' + arrName[i]);
  		fileName += arrName[i] + '.';
  	}
  	fileName = fileName.slice(0,-1);
  	console.log('name ' + fileName + '  ext ' + arrName[len - 1]);
  	return {'name': fileName, 'ext': arrName[len - 1]};
}

//main Function
/*
var opts = {
	'oldFile': 'test.txt',
	'newFile': 'test1.txt',
	'wordsFile': 'rep1.txt'
};
*/
var newF =  _getNameExt(myArgs[0]);
//var newFile = newF.name + '_rep.' + newF.ext;
var newFile = newF.name + '.md';

var opts = {
	'oldFile': myArgs[0],
	'newFile': newFile,
	'wordsFile': myArgs[1]
};
doIt(opts);