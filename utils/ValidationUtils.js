const logger = require('../config/winston');

class ValidationUtils {
    
    /* 요청이 유효한지 확인하는 메소드
    params: 요청에서 들어온 json 
    keys: http api 명세에라 request에서 들어와야할
          json의 형태
    */

    static isRequestValid(req, reqJson) {
        let preFix = "ValidationUtils.isRequestValid(params, keys) : ";

        let params = "";
        try {
            //제대로된 형식의 json이 넘어오지 않음
            params = req.body;
        } catch (error) {
            logger.error(preFix + "parameter type is not json");
            return false;
        }

        
        if (Object.keys(params).length != Object.keys(reqJson).length) {
            logger.error(preFix + "parameter and apiKey Not Same");
            return false;
        }

        //빈 params일 경우
        if (params==null || 
            (Object.keys(params).length === 0 && 
            JSON.stringify(params) === JSON.stringify({}))
           ) 
        {
            logger.error(preFix + "parameter is Empty");
            return false;
        }
    
        //빈 apiKey일경우
        if (reqJson==null || 
            (Object.keys(reqJson).length === 0 && 
            JSON.stringify(reqJson) === JSON.stringify({}))
           ) 
        {
            logger.error(preFix + "apiKey must be not null");
            return false;
        }

        let keyArr = Object.keys(reqJson);
    
    
        for (var i=0; i<keyArr.length; i++) {
            try {
                debugger;
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
}

module.exports = ValidationUtils;