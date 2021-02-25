const express = require('express');
const app = express();

const path = require('path');
const logger = require('../config/winston');
const mapper = require('mybatis-mapper');
const dbconn = require('../config/dbConn');
const clone = require('lodash');

const Validation = require('../utils/ValidationUtils.js');
var HttpApi = require('../utils/Http.js');

const mapperPath = path.join(__dirname, '../sql/User.xml');
mapper.createMapper([mapperPath]);

const format = {language: 'sql', indent: ' '};

//사용자 아이디 중복검사
app.get('/users/:user_id', function(req, res) {
    const reqJson = HttpApi.USER_CHECK.reqJson;
    let resJson = clone.cloneDeep(HttpApi.USER_CHECK.resJson);

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req.params, HttpApi.USER_CHECK) == false) {
        resJson.code = HttpApi.HTTP_CODE.INVALID_REQUEST;
        resJson.result.user_check = false;
        res.send(resJson);
        return;
    }

    let params = req.params;

    let query = mapper.getStatement('User', 'check_user', params, format);
    logger.info("SQL :: " + query);
    
    dbconn.query(query, function(err, result, fields) {
        try {
            if (result.length == 0){//결과 없음
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                resJson.result.user_check = true;
                res.send(resJson);
                return;
            }
            else if (result.length == 1){
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                resJson.result.user_check = false;
                res.send(resJson);
                return;
            } else {
                resJson.code = "500";
                if (err) {
                    //에러로그 작성
                    resJson.code = "500";
                    logger.error(err);
                }            
                resJson.user_check = false;
                res.send(resJson);
                return;
            }
        } catch (error) {
            //에러로그 작성
            resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
            logger.error(error);
            resJson.result.user_check = false;
            res.send(resJson);
            return;
        }
    });
});

//사용자 아이디 중복검사
app.get('/users/nickname/:nickname', function(req, res) {
    const reqJson = HttpApi.NICKNAME_CHECK.reqJson;
    let resJson = clone.cloneDeep(HttpApi.NICKNAME_CHECK.resJson);

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req.params, HttpApi.NICKNAME_CHECK) == false) {
        resJson.code = HttpApi.HTTP_CODE.INVALID_REQUEST;
        resJson.result.nickname_check = false;
        res.send(resJson);
        return;
    }

    let params = req.params;

    let query = mapper.getStatement('User', 'check_nickname', params, format);
    logger.info("SQL :: " + query);
    
    dbconn.query(query, function(err, result, fields) {
        try {
            if (result.length == 0){//결과 없음
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                resJson.result.nickname_check = true;
                res.send(resJson);
                return;
            }
            else if (result.length == 1){
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                resJson.result.nickname_check = false;
                res.send(resJson);
                return;
            } else {
                resJson.code = "500";
                if (err) {
                    //에러로그 작성
                    resJson.code = "500";
                    logger.error(err);
                }            
                resJson.result.nickname_check = false;
                res.send(resJson);
                return;
            }
        } catch (error) {
            //에러로그 작성
            resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
            logger.error(err);
            resJson.result.nickname_check = false;
            res.send(resJson);
            return;
        }
        
    });
});

//회원가입
app.post('/register', function(req, res) {
    const reqJson = HttpApi.REGISTER.reqJson;
    let resJson = clone.cloneDeep(HttpApi.REGISTER.resJson);

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req.body, HttpApi.REGISTER) == false) {
        resJson.code = HttpApi.HTTP_CODE.INVALID_REQUEST;
        resJson.result.isRegister = false;
        res.send(resJson);
        return;
    }

    let params = req.body;

    try {
        let query = mapper.getStatement('User', 'insert_user', params, format);
        logger.info("SQL :: " + query);

        dbconn.query(query, function(err, result, fields) {
            if (err) {
                resJson.code = HttpApi.HTTP_CODE.INVALID_REQUEST;
                resJson.result.isRegister = false;
                res.send(resJson);
                return;
            } else {
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                resJson.result.isRegister = true;
                res.send(resJson);
                return;
            }
        });
    } catch (error) {
        resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
        logger.error(err);
        resJson.result.isRegister = false;
        res.send(resJson);
        return;
    }    
});


module.exports = app;