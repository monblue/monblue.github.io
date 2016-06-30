var express = require('express')
	, path = require('path')
  , app = express()
//  , routes = require('./routes')
//  , engine = require('ejs-locals');
//  , routes = require('./routes');


//app.engine('ejs', engine);
//app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('port', process.env.PORT || 9999);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/photo', express.static('d:/dev/blog/monblue.github.io/_apps/_bookEdit/file/img'));	//virtual directory
//app.get('/', routes.index);

var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
