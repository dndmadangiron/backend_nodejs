const logger = require('../config/winston');

class ValidationUtils {
    
    /* 요청이 유효한지 확인하는 메소드
    params: 요청에서 들어온 json 
    keys: http api 명세에라 request에서 들어와야할
          json의 형태
    */

    static isRequestValid(params, HTTP) {
        let preFix = "ValidationUtils.isRequestValid(req, reqJson) : ";
        let reqJson = HTTP.reqJson;
        if (!reqJson) {
            logger.error(preFix + "check isRequestValid HTTP parameter")
            return false;
        }
        
        return this.isJsonValid(params, reqJson);

    }

    static isJsonValid(params, reqJson) {
        let preFix = "ValidationUtils.isRequestValid(params, keys) : ";

        //빈 req가 아닌데 빈 params일 경우
        if (this.isJsonEmpty(params) && !this.isJsonEmpty(reqJson)) {
            logger.error(preFix + "this parameter cannot be Empty");
            return false;
        }
    
        // //빈 apiKey일경우 //GET 요청시 빈 파라마터도 요청하기 때문에 주석
        // if (this.isJsonEmpty(reqJson)) {
        //     logger.error(preFix + "apiKey must be not null");
        //     return false;
        // }
		if (Object.keys(params).length < Object.keys(reqJson).length) {
            logger.error(preFix + "parameter keys length is not valid");
            return false;
        }

        let keyArr = Object.keys(reqJson);
    
    
        for (var i=0; i<keyArr.length; i++) {
            try {
                if (params[keyArr[i]] == null || params[keyArr[i]] == "")
                {
                    logger.error(preFix + "parameter is Empty key:["+keyArr[i]+"]");
                    return false;
                }
            } catch(error) {
                logger.error(preFix + "parameter and key not matched key:["+keyArr[i]+"]");
                return false;
            }
        }

        return true;
    }

    static isJsonEmpty(json) {
        //빈 params일 경우
        try {
            if (json==null || 
                (Object.keys(json).length === 0 && 
                JSON.stringify(json) === JSON.stringify({}))
               ) 
            {
                return true;
            }
        } catch (error) {
            return true;
        }
        
    }
}

module.exports = ValidationUtils;