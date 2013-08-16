var express = require('express')
  , app = express()
  , questions = require('./questions');


app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.static(__dirname, '/static'));
});

app.get('/suggest', function(req, res) {
    return res.render("suggest")
});

app.post('/suggest', function(req, res) {
    var question = {
            title: req.body.question,
            answer: req.body.answer == "yes" ? 1 : 0
        };
    questions.insert(question, function(question, err) {
        params = {};
        if(err) {
            params['errors'] = err;
            return res.render("suggest", params);
        }
        return res.redirect(302, "/"+question.slug);
    })
});

app.get('/:slug', function(req, res) {
    questions.findBySlug(req.params.slug, function(question) {
        return res.render("index", question);
    })
});

app.get('/', function(req, res) {
    questions.findAll(function(questions) {
        return res.render("index", questions[0]);
    })
});

app.listen(3000);
