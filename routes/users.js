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
const Validation = require('../utils/ValidationUtils.js');
var HttpApi = require('../utils/Http.js');

const mapperPath = path.join(__dirname, '../sql/User.xml');
mapper.createMapper([mapperPath]);

const format = {language: 'sql', indent: ' '};

//사용자 아이디 중복검사
app.get('/users/:user_id', function(req, res) {
    const reqJson = HttpApi.USER_CHECK.reqJson;
    let resJson = HttpApi.USER_CHECK.resJson;

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req, reqJson) == false) {
        resJson.code = "403";
        resJson.user_check = false;
        res.send(resJson);
        return;
    }

    let params = req.params;

    let query = mapper.getStatement('User', 'check_user', params, format);
    dbconn.query(query, function(err, result, fields) {
        try {
            if (result.length == 0){//결과 없음
                resJson.code = "200";
                resJson.user_check = true;
                res.send(resJson);
                return;
            }
            else if (result.length == 1){
                resJson.code = "200";
                resJson.user_check = false;
                res.send(resJson);
                return;
            } else {
                resJson.code = "503";
                if (err) {
                    //에러로그 작성
                    resJson.code = "503";
                    logger.error(err);
                }            
                resJson.user_check = false;
                res.send(resJson);
                return;
            }
        } catch (error) {
            //에러로그 작성
            resJson.code = "503";
            logger.error(err);
            resJson.user_check = false;
            res.send(resJson);
            return;
        }
    });
});

//사용자 아이디 중복검사
app.get('/users/nickname/:nickname', function(req, res) {
    const reqJson = HttpApi.NICKNAME_CHECK.reqJson;
    let resJson = HttpApi.NICKNAME_CHECK.resJson;

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req, reqJson) == false) {
        resJson.code = "403";
        resJson.nickname_check = false;
        res.send(resJson);
        return;
    }

    let params = req.params;

    let query = mapper.getStatement('User', 'check_nickname', params, format);
    dbconn.query(query, function(err, result, fields) {
        try {
            if (result.length == 0){//결과 없음
                resJson.code = "200";
                resJson.nickname_check = true;
                res.send(resJson);
                return;
            }
            else if (result.length == 1){
                resJson.code = "200";
                resJson.nickname_check = false;
                res.send(resJson);
                return;
            } else {
                resJson.code = "503";
                if (err) {
                    //에러로그 작성
                    resJson.code = "503";
                    logger.error(err);
                }            
                resJson.nickname_check = false;
                res.send(resJson);
                return;
            }
        } catch (error) {
            //에러로그 작성
            resJson.code = "503";
            logger.error(err);
            resJson.nickname_check = false;
            res.send(resJson);
            return;
        }
        
    });
});

//회원가입
app.post('/register', function(req, res) {
    const reqJson = HttpApi.REGISTER.reqJson;
    let resJson = HttpApi.REGISTER.resJson;

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req, reqJson) == false) {
        resJson.code = "403";
        resJson.isRegister = false;
        res.send(resJson);
        return;
    }

    let params = req.body;

    let query = mapper.getStatement('User', 'insert_user', params, format);

    dbconn.query(query, function(err, result, fields) {
        if (err) {
            resJson.code = "503";
            resJson.isRegister = false;
            res.send(resJson);
            return;
        } else {
            resJson.code = "200";
            resJson.isRegister = true;
            res.send(resJson);
            return;
        }
    });
});


module.exports = app;