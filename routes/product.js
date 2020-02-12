const express = require('express');
const app = express();

const path = require('path');
const logger = require('../config/winston');
const mapper = require('mybatis-mapper');
const dbconn = require('../config/dbConn');

const Validation = require('../utils/ValidationUtils.js');
var HttpApi = require('../utils/Http.js');
const clone = require('lodash');

const mapperPath = path.join(__dirname, '../sql/Product.xml');
mapper.createMapper([mapperPath]);
const mapper_ns = 'Product';

const format = {language: 'sql', indent: ' '};

// 카테고리 전체 조회
app.get('/category/all', function(req, res) {
    const reqJson = HttpApi.CATE_ALL.reqJson
    let resJson = clone.cloneDeep(HttpApi.CATE_ALL.resJson);

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req.query, HttpApi.CATE_ALL) == false) {
        resJson.code = "403";
        resJson.result.user_check = false;
        res.send(resJson);
        return;
    }
    
    let params = req.params;

    let query = mapper.getStatement(mapper_ns, 'get_cate_all', params, format);
    logger.info(mapper_ns+".get_cate :: " + query);

    dbconn.query(query, function(err, result, fields) {
        try {
            if (result.length == 0){//결과 없음
                resJson.code = "200";
                res.send(resJson);
                return;
            }
            else if (result.length > 0){
                resJson.code = "200";

                resJson.result.category = makeCategoryTree(result);
                // resJson.result.category = result


                res.send(resJson);
                return;
            } else {
                resJson.code = "503";
                if (err) {
                    //에러로그 작성
                    resJson.code = "503";
                    logger.error(err);
                }            
                res.send(resJson);
                return;
            }
        } catch (err) {
            //에러로그 작성
            resJson.code = "503";
            logger.error(err);
            res.send(resJson);
            return;
        }
    });
});

// 카테고리 대분류 조회
app.get('/category/bg', function(req, res) {
    const reqJson = HttpApi.CATE_BG.reqJson;
    let resJson = clone.cloneDeep(HttpApi.CATE_BG.resJson);

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req.query, HttpApi.CATE_BG) == false) {
        resJson.code = "403";
        res.send(resJson);
        return;
    }

    var params = req.body;

    let query = mapper.getStatement(mapper_ns, 'get_cate_bg', params, format);
    logger.info(mapper_ns+".get_cate :: " + query);
    
    dbconn.query(query, function(err, result, fields) {
        try {
            if (result.length == 0){//결과 없음
                resJson.code = "200";
                res.send(resJson);
                return;
            }
            else if (result.length > 0){
                resJson.code = "200";
                resJson.result.category=result;
                res.send(resJson);
                return;
            } else {
                resJson.code = "503";
                if (err) {
                    //에러로그 작성
                    logger.error(err);
                }
                res.send(resJson);
                return;
            }
        } catch (err) {
            //에러로그 작성
            resJson.code = "503";
            logger.error(err);
            res.send(resJson);
            return;
        }
    });
});

// 카테고리 중분류 조회
app.get('/category/md', function(req, res) {
    const reqJson = HttpApi.CATE_MD.reqJson;
    let resJson = clone.cloneDeep(HttpApi.CATE_MD.resJson);

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req.query, HttpApi.CATE_MD) == false) {
        resJson.code = "403";
        res.send(resJson);
        return;
    }

    let params = req.query;
    params.cate_sm = "00";

    let query = mapper.getStatement(mapper_ns, 'get_cate_md', params, format);
    logger.info(mapper_ns+".get_cate :: " + query);

    dbconn.query(query, function(err, result, fields) {
        try {
            if (result.length == 0){//결과 없음
                resJson.code = "200";
                res.send(resJson);
                return;
            }
            else if (result.length > 0){
                resJson.code = "200";
                resJson.result.category=result;
                res.send(resJson);
                return;
            } else {
                resJson.code = "503";
                if (err) {
                    //에러로그 작성
                    logger.error(err);
                }
                res.send(resJson);
                return;
            }
        } catch (err) {
            //에러로그 작성
            resJson.code = "503";
            logger.error(err);
            res.send(resJson);
            return;
        }
    });
});

// 카테고리 소분류 조회
app.get('/category/sm', function(req, res) {
    const reqJson = HttpApi.CATE_SM.reqJson;
    let resJson = clone.cloneDeep(HttpApi.CATE_SM.resJson);

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req.query, HttpApi.CATE_SM) == false) {
        resJson.code = "403";
        res.send(resJson);
        return;
    }

    let params = req.query;

    let query = mapper.getStatement(mapper_ns, 'get_cate_sm', params, format);
    logger.info(mapper_ns+".get_cate :: " + query); 
    
    dbconn.query(query, function(err, result, fields) {
        try {
            if (result.length == 0){//결과 없음
                resJson.code = "200";
                res.send(resJson);
                return;
            }
            else if (result.length > 0){
                resJson.code = "200";
                resJson.result.category=result;
                res.send(resJson);
                return;
            } else {
                resJson.code = "503";
                if (err) {
                    //에러로그 작성
                    logger.error(err);
                }
                res.send(resJson);
                return;
            }
        } catch (err) {
            //에러로그 작성
            resJson.code = "503";
            logger.error(err);
            res.send(resJson);
            return;
        }
    });
});

function makeCategoryTree(res) {
    let list;


    let len = res.length
    let bg=0,md=0,sm=0;
    for(i=0;i<len;i++){
        
    }
    
}

module.exports = app;