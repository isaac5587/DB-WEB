
var express = require('express');
var app = express();
const request = require('request');
const sql = require('mssql');            //interact with database
const bodyParser = require('body-parser');
//const routes = require( "./routes" );

// Set the View Engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Set up the server
// process.env.PORT is related to deploying on AWS
var server = app.listen(process.env.PORT || 5000, listen);
module.exports = server;
path = require('path');

let dbConnection = "mssql://isaac.ansumana:power@ev-compsci-01.principia.local/isaac.ansumana";
app.get('/', async (red,res) => {
      try{
        console.log(dbConnection);

        // Connecting to DB
        sql.connect(dbConnection, function(err){
          if(err) console.log(err);

          // Create a new request
          let sqlRequest = new sql.Request();
          let sqlQuery = 'SELECT ID, firstName, lastName, favorites FROM Customer;';
          sqlRequest.query(sqlQuery, function(err, data){
            if (err) console.log(err);
            console.log(data);
            console.table(data.recordset);
            sql.close();
            res.sendFile(path.join(__dirname + '/public/index.html'));
          });
        });
      }
      catch (err){
        res.status(500);
        res.send(err.message);
      }
});


// ***********************************************
// Be sure any routes are setup before this!
// Set the folder for public items
publicDir = path.join(__dirname,'public');
app.use(express.static(publicDir))
app.set('views', __dirname);
app.use(express.urlencoded({ extended: true }))

// This call back just tells us that the server has started
function listen() {  // listens for local requests
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://' + host + ':' + port);
}