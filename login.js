const express = require('express');
const app = express();

const path = require('path');
const logger = require('./config/winston');
const mysql = require('mysql');
const mapper = require('mybatis-mapper');
const dbconn = mysql.createConnection({
    host:'104.196.13.195',
    port:3306,
    user:'root',
    password:'tkakcy159*',
    database: 'madangiron'
});

const mapperPath = path.join(__dirname, './sql/User.xml');
mapper.createMapper([mapperPath]);

const format = {language: 'sql', indent: ' '};

//사용자 아이디 중복검사
app.post('/', function(req, res) {
    let params = {
        user_id : req.body.id,
        user_pw : req.body.pw
    }
    let query = mapper.getStatement('User', 'login_user', params, format);
    dbconn.query(query, function(err, result, fields) {
       if(result.length==1){
           res.send({result:"true"});
       }
       else if(result.length>1){ //filtering DB Error
           res.send({result:"false"} + "More than 1 same id&pw is exist");
       }
       else{
           res.send({result:"false"});
       }
    });


});


module.exports = app;
