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
        resJson.code = HttpApi.HTTP_CODE.INVALID_REQUEST;
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
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                res.send(resJson);
                return;
            }
            else if (result.length > 0){
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                resJson.result.category = makeCategoryTree(result);
                // resJson.result.category = result
                

                res.send(resJson);
                return;
            } else {
                resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
                if (err) {
                    //에러로그 작성
                    resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
                    logger.error(err);
                }            
                res.send(resJson);
                return;
            }
        } catch (err) {
            //에러로그 작성
            resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
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
        resJson.code = HttpApi.HTTP_CODE.INVALID_REQUEST;
        res.send(resJson);
        return;
    }

    var params = req.body;

    let query = mapper.getStatement(mapper_ns, 'get_cate_bg', params, format);
    logger.info(mapper_ns+".get_cate :: " + query);
    
    dbconn.query(query, function(err, result, fields) {
        try {
            if (result.length == 0){//결과 없음
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                res.send(resJson);
                return;
            }
            else if (result.length > 0){
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                resJson.result.category=result;
                res.send(resJson);
                return;
            } else {
                resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
                if (err) {
                    //에러로그 작성
                    logger.error(err);
                }
                res.send(resJson);
                return;
            }
        } catch (err) {
            //에러로그 작성
            resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
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
        resJson.code = HttpApi.HTTP_CODE.INVALID_REQUEST;
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
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                res.send(resJson);
                return;
            }
            else if (result.length > 0){
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                resJson.result.category=result;
                res.send(resJson);
                return;
            } else {
                resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
                if (err) {
                    //에러로그 작성
                    logger.error(err);
                }
                res.send(resJson);
                return;
            }
        } catch (err) {
            //에러로그 작성
            resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
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
        resJson.code = HttpApi.HTTP_CODE.INVALID_REQUEST;
        res.send(resJson);
        return;
    }

    let params = req.query;

    let query = mapper.getStatement(mapper_ns, 'get_cate_sm', params, format);
    logger.info(mapper_ns+".get_cate :: " + query); 
    
    dbconn.query(query, function(err, result, fields) {
        try {
            if (result.length == 0){//결과 없음
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                res.send(resJson);
                return;
            }
            else if (result.length > 0){
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                resJson.result.category=result;
                res.send(resJson);
                return;
            } else {
                resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
                if (err) {
                    //에러로그 작성
                    logger.error(err);
                }
                res.send(resJson);
                return;
            }
        } catch (err) {
            //에러로그 작성
            resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
            logger.error(err);
            res.send(resJson);
            return;
        }
    });
});


// 검색 : 상품명
app.get('/search/prdName', function(req, res) {
    const reqJson = HttpApi.SEARCH_PRD.reqJson;
    let resJson = clone.cloneDeep(HttpApi.SEARCH_PRD.resJson);

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req.query, HttpApi.SEARCH_PRD) == false) {
        resJson.code = HttpApi.HTTP_CODE.INVALID_REQUEST;
        res.send(resJson);
        return;
    }

    let params = req.query;

    if (params.page != null && typeof(page) == 'number' &&
        params.size != null && typeof(size) == 'number')
    {
        page = page * size;
    }
    let cnt_query =  mapper.getStatement(mapper_ns, 'search_cnt_prd_name', params, format);
    var cntDbconn = require('../config/dbConn');
    logger.info(mapper_ns+".search_cnt_prd_name :: \n" + cnt_query); 
    cntDbconn.query(cnt_query, function(err, result, fields) {
        try {
            resJson.result.total = result[0].total;
        } catch (err) {
            logger.error(err);
        }
        
    });
    

    let query = mapper.getStatement(mapper_ns, 'search_prd_name', params, format);
    logger.info(mapper_ns+".search_prd_name :: \n" + query); 
    
    dbconn.query(query, function(err, result, fields) {
        try {
            if (result.length == 0){//결과 없음
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                res.send(resJson);
                return;
            }
            else if (result.length > 0){
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                resJson.result.products=result;
                res.send(resJson);
                return;
            } else {
                resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
                if (err) {
                    //에러로그 작성
                    logger.error(err);
                }
                res.send(resJson);
                return;
            }
        } catch (err) {
            //에러로그 작성
            resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
            logger.error(err);
            res.send(resJson);
            return;
        }
    });
});


app.get('/search/rank', function(req, res) {
    const reqJson = HttpApi.SEARCH_PRD.reqJson;
    let resJson = clone.cloneDeep(HttpApi.SEARCH_PRD.resJson);

    //api명세의 request에서 넘어와야 하는 request Json을 지정해준다.
    if (Validation.isRequestValid(req.query, HttpApi.SEARCH_PRD) == false) {
        resJson.code = HttpApi.HTTP_CODE.INVALID_REQUEST;
        res.send(resJson);
        return;
    }

    let params = req.query;

    if (params.page != null && typeof(page) == 'number' &&
        params.size != null && typeof(size) == 'number')
    {
        page = page * size;
    }
    let cnt_query =  mapper.getStatement(mapper_ns, 'search_cnt_prd_name', params, format);
    var cntDbconn = require('../config/dbConn');
    logger.info(mapper_ns+".search_cnt_prd_name :: \n" + cnt_query); 
    cntDbconn.query(cnt_query, function(err, result, fields) {
        try {
            resJson.result.total = result[0].total;
        } catch (err) {
            logger.error(err);
        }
        
    });
    

    let query = mapper.getStatement(mapper_ns, 'search_prd_name', params, format);
    logger.info(mapper_ns+".search_prd_name :: \n" + query); 
    
    dbconn.query(query, function(err, result, fields) {
        try {
            if (result.length == 0){//결과 없음
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                res.send(resJson);
                return;
            }
            else if (result.length > 0){
                resJson.code = HttpApi.HTTP_CODE.SUCCESS;
                resJson.result.products=result;
                res.send(resJson);
                return;
            } else {
                resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
                if (err) {
                    //에러로그 작성
                    logger.error(err);
                }
                res.send(resJson);
                return;
            }
        } catch (err) {
            //에러로그 작성
            resJson.code = HttpApi.HTTP_CODE.SERVER_ERROR;
            logger.error(err);
            res.send(resJson);
            return;
        }
    });
});




//카테고리 전체 조회시 트리구조로 만듦
function makeCategoryTree(res) {
    let startTime = new Date().getTime();
    console.log("makeCategoryTree is running");
    /**Function's rule
     * 
     * 1. function's parameter 'res' is json type about category data.
     * 2. Category is devided by three property that cate_bg, cate_md, cate_sm.
     *    Each property means category big, middle, small
     * 3. cate_bg(1~*), cate_md(0~*), cate_sm(0~*)
     * 4. Each tuple MUST have rule 2's three property.
     * 5. Property of tuples has descend order.
     *    Ex) 100 110 111 112 113 120 121 122 123 200 210 211 212 220 221 222 223
     * 6. Structure of return value
     *    Ex) [ 100->{110->(111 112 113), {120->(121 122 123)} ] , [ 200->{210->(211 212), 220->(221)} ]
     *    
     */

     
    let list = [];
    
    let idx_bg = -1;
    let idx_md = -1;
    let i = 0;

    while(res[i]!=null){
        if(res[i].cate_md=='00'&&res[i].cate_sm=='00'){
            list.push(res[i]);
            idx_bg++;
            i++;
            idx_md = -1;

            list[idx_bg].item_md = [];
            
            while(res[i].cate_md!='00'){
                if(i==104){
                }

                if(res[i].cate_sm=='00'){
                    list[idx_bg].item_md.push(res[i]);
                    idx_md++;
                    i++;

                    list[idx_bg].item_md[idx_md].item_sm = [];
                }
                else if(res[i].cate_sm!='00'){
                    if(i==104){
                    }
                    list[idx_bg].item_md[idx_md].item_sm.push(res[i]);
                    i++;
                    
                    if(res[i]==null){
                        break;
                    }
                }
            }
        }
    }

    let endTime = new Date().getTime();
    logger.info("makeCategoryTree function using time : " + (endTime-startTime) + "ms");
    return list;
}

module.exports = app;


// KIMJINWAN IS BYUNGSHIN! FACT