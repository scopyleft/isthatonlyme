var express = require('express')
  , app = express()
  , port = process.env.PORT || 3000
  , questions = require('./questions');


app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.static(__dirname, '/static'));
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
        return res.render("view", {question: question});
    })
});

app.get('/', function(req, res) {
    return res.render("suggest");
});

app.listen(port, function() {
  console.log("Listening on " + port);
});
