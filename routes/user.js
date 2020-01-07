const express = require('express');
const app = express();

const path = require('path');
const logger = require('../config/winston');
const mysql = require('mysql');
const mapper = require('mybatis-mapper');
const dbconn = mysql.createConnection({
    host:'104.196.13.195',
    port:3306,
    user:'root',
    password:'tkakcy159*',
    database: 'madangiron'
});

const mapperPath = path.join(__dirname, '../sql/User.xml');
mapper.createMapper([mapperPath]);

const format = {language: 'sql', indent: ' '};

//사용자 아이디 중복검사
app.get('/:user_id', function(req, res) {
    let params = req.params;
    let query = mapper.getStatement('User', 'check_user', params, format);

    dbconn.query(query, function(err, result, fields) {
        if (result.length == 0){//결과 없음
            res.send({user_check: true});
        }
        else if (result.length == 1){
            res.send({user_check: false});
        } else {
            if (err) {
                //에러로그 작성
                logger.error(err);
                
                res.send({user_check: false});
            }
            res.send({user_check: false});
        }
    });
});

module.exports = app;