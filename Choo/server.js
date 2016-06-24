var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var path = require('path');

// var HomePage = require('./public/js/tmp/components/Home').Home;
// var StorePage = require('./public/js/tmp/components/Store').Store;

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/*', function(req, res){
    res.render('index', {});
});

// app.get('/', function(req, res){
//     res.render('index', {
//         reactApp: ReactDOM.renderToString(React.createElement(HomePage))
//     });
// });
//
// app.get('/store', function(req, res){
//     res.render('index', {
//         reactApp: ReactDOM.renderToString(React.createElement(StorePage))
//     });
// });

app.listen(3000, function() {
    console.log('Listening on port 3000...');
    console.log('http://localhost:3000/');
});
