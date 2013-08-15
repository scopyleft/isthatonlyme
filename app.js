var express = require('express')
  , app = express()
  , questions = require('./questions');


app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.static(__dirname, '/static'));
});

app.get('/:slug', function(req, res) {
    questions.findBySlug(req.params.slug, function(question) {
        return res.render(__dirname + "/views/index", question);
    })
});

app.get('/', function(req, res){
    questions.findAll(function(questions) {
        return res.render(__dirname + "/views/index", questions[0]);
    })
});

app.listen(3000);
