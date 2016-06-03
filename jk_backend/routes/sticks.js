var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodeParser = bodyParser.urlencoded( { extended: false });

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'jk'
});

connection.connect();


router.post('/add', function(req, res, next) {
   var addSQL = mysql.format("insert into jk_sticks(fs_id,u_id,st_create_time) values (?,?,default)",[req.body.fs_id, req.body.u_id]);

    connection.query(addSQL, function (err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});


router.get('/getSticksByFSID', function(req, res, next) {
   var criteriaSQL = mysql.format("select (select u_avatar from jk_users as jku where jku.u_id = jks.u_id) as u_vatar from jk_sticks as jks where jks.fs_id = ?",[req.param('fs_id')]);

    connection.query(criteriaSQL, function (err, result) {
        if(err) {
            res.send("Error: " + err);
        } else {
            res.send(result);
        }
    })
});






module.exports = router;