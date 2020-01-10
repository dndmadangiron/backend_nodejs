const express = require('express');
const app = express();

const path = require('path');
const logger = require('../config/winston');
const mysql = require('mysql');
const mapper = require('mybatis-mapper');
const dbconn = mysql.createConnection({
    host: '104.196.13.195',
    port: 3306,
    user: 'root',
    password: 'tkakcy159*',
    database: 'madangiron'
});
const Validation = require('../utils/ValidationUtils');

const mapperPath = path.join(__dirname, '../sql/User.xml');
mapper.createMapper([mapperPath]);

const format = { language: 'sql', indent: ' ' };

//로그인
app.post('/auth/login', function (req, res) {
    const reqJson =
    {
        "user_id": "",
        "user_pw": ""
    };
    let resJson =
    {
        "code": "",
        "isLoggedIn": "",
    }

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req, reqJson) == false) {
        resJson.code = "403";
        resJson.isLoggedIn = false;
        res.send(resJson);
        return;
    }

    let params = {
        user_id: req.body.id,
        user_pw: req.body.pw
    }
    let query = mapper.getStatement('User', 'login_user', params, format);
    dbconn.query(query, function (err, result, fields) {
        if (result.length == 1) {
            resJson.code = "200";
            resJson.isLoggedIn = true;
            res.send(resJson);
            return;
        }
        else if (result.length > 1) { //filtering DB Error
            resJson.code = "503";
            resJson.isLoggedIn = false;
            res.send(resJson);
            return;
        }
        else {
            resJson.code = "503";
            resJson.isLoggedIn = false;
            res.send(resJson);
            return;
        }
    });
});


module.exports = app;
