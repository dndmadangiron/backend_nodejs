const Validation = require('./ValidationUtils.js');
const logger = require('../config/winston.js');
const jwt = require('../node_modules/jsonwebtoken');
// const jwtPrivate = require('../config/jwtPrivate.js');
const jwtPrivate = require('../config/jwtPrivate.js');

class JwtUtils {
    
    //토큰 발급
    static createJwtToken(paylod) {
        
        const TIMEOUT = '60m';
        if (Validation.isJsonEmpty(paylod)) {
            return null;
        }

        try {
            // jwt.sign(데이터, 암호화키(private), 유효기간)
            let token = jwt.sign(
                paylod,
                jwtPrivate.secret,
                {
                    expiresIn: TIMEOUT
                }
            );
            // 토큰 반환
            return token;
        } catch(error) {
            logger.error('Exception While Create Token');
            return null;
        }
    }

    //토큰이 유효한지 & timeout 안지났는지
    static isTokenVail() {

    }

    // 토큰 유효성 확인
    static verifiyToken(token) {
        
        if (token == null || token == "") {
            return false;
        }
        jwt.verify(token, jwtPrivate.secret, function(err, decoded) {
            if (err) {
                logger.error('Exception While verifiyToken()');
                return false;
            }
        });
        return true;
    }

    // 토큰 데이터 가져오기
    static getTokenPaylod(token) {
        if (this.verifiyToken(token)) {
            let payload = {}
            jwt.verify(token, jwtPrivate.secret, function(err, decoded) {
                if (err) {
                    logger.error('Exception While getTokenPaylod()');
                    return null;
                }
                payload = decoded;
            });
            return payload;
        }
        else {
            return null;
        }
    }
}

module.exports = JwtUtils;