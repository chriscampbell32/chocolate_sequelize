//express setup
var express = require('express');
var app = express();
var port = 3000;

//database setup
var Sequelize = require('sequelize');
var connection = new Sequelize('chocolate_db', 'root');

//handlebars setup
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var Chocolate = connection.define('chocolate', {
    name: Sequelize.STRING,
    satisfaction: Sequelize.INTEGER
});

Chocolate.bulkCreate([
    { name: 'Dark Chocolate', satisfaction: 8},
    { name: 'couverture', satisfaction: 5},
    { name: 'Milk Chocolate', satisfaction: 10}

]);

//routes
app.get('/', function(req, res) {
    res.render('chocolate');
});

// database connection via sequelize
connection.sync().then(function() {
  app.listen(port, function() {
      console.log("Listening on:" + port)
  });
});
