var mongo = require('mongodb')
  , Server = mongo.Server
  , config = require('./config')
  , server = new Server(config.db.server, config.db.port, {auto_reconnect : true})
  , db = new mongo.Db(config.db.database, server)
  , utils = require('./utils');


db.open(function(err, client) {
    client.authenticate(config.db.username, config.db.password, function(err, success) {
        db.collection('questions', {strict:true}, function(err, collection) {
            if (err) {
                console.error("The 'questions' collection doesn't exist.");
            }
        });
    });
});

exports.findAll = function(callback) {
    db.collection('questions', function(err, collection) {
        collection.find().sort({'creation_date': -1}).toArray(function(err, items) {
            callback(items);
        });
    });
};

exports.findBySlug = function(slug, callback) {
    db.collection('questions', function(err, collection) {
        collection.findOne({'slug': slug}, function(err, item) {
            callback(item);
        });
    });
}

exports.insert = function(question, callback) {
    question.slug = utils.slugify(question.title);
    db.collection('questions', function(err, collection) {
        collection.insert(question, {safe: true}, function(err) {
            callback(question, err);
        });
    });
}
