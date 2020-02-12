const express = require('express');
const app = express();

const Validation = require('../utils/ValidationUtils');
const HttpApi = require('../utils/Http.js');
const jwtUtils = require('../utils/JwtUtils.js');
const path = require('path');
const logger = require('../config/winston');
const mapper = require('mybatis-mapper');
const dbconn = require('../config/dbConn');


const mapperPath = path.join(__dirname, '../sql/User.xml');
mapper.createMapper([mapperPath]);

const format = { language: 'sql', indent: ' ' };

//로그인
app.post('/auth/login', function (req, res) {
    const reqJson = HttpApi.LOGIN.reqJson;
    let resJson = clone.cloneDeep(HttpApi.LOGIN.resJson);

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req.body, HttpApi.LOGIN) == false) {
        resJson.code = "403";
        resJson.result.isLoggedIn = false;
        res.send(resJson);
        return;
    }

    let params = req.body;

    let query = mapper.getStatement('User', 'login_user', params, format);
    logger.info("SQL :: " + query);
    
    dbconn.query(query, function (err, result, fields) {
        if (result.length == 1) {
            let payload = {
                user_id: result[0].user_id
            }
            if (err) {
                resJson.code = "503";
                resJson.result.isLoggedIn = false;                
            } else {
                let token = jwtUtils.createJwtToken(payload);
                resJson.code = "200";
                resJson.result.isLoggedIn = true;
                // response의 header에 jwt토큰 세팅
                res.set("token", token);
            }
            
            res.send(resJson);
            return;
        }
        else if (result.length > 1) { //filtering DB Error
            resJson.code = "503";
            resJson.result.isLoggedIn = false;
            res.send(resJson);
            return;
        }
        else {
            resJson.code = "503";
            resJson.result.isLoggedIn = false;
            res.send(resJson);
            return;
        }
    });
});

app.post('/auth/token', function(req, res){
    var header = req.headers;
    if (header != null && header.token != null) {
        let token = header.token;
        console.log(token);

        let payload = jwtUtils.getTokenPaylod(token);
        console.log(payload);
        let start = new Date();
        let now = new Date();
        let end = new Date();
        start.setTime(payload.iat * 1000);
        end.setTime(payload.exp * 1000);

        let timeToExpire = Math.floor((end - now)/1000);
        let timeout = Math.floor((end - start)/1000);

        console.log("timeToExpire : " + timeToExpire)
        console.log("timeout : " + timeout);

        res.send(payload);
    }
});


module.exports = app;
