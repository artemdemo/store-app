var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var React = require('react');
var ReactDOM = require('react-dom/server');
var browserify = require('browserify-middleware');

//provide a browserified file at a path
app.get('/js/file.js', browserify(__dirname + '/client/file.js'));

app.get('/', function(req, res){
    res.render('index', {
        reactApp: ReactDOM.renderToString(HelloMessage({name: "John"}))
    })
});

app.listen(3000, function() {
    console.log('Listening on port 3000...')
});
