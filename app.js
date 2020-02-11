const express = require('express');
const app = express();
const PORT = 3030;

/**[START] 모듈 선언*/
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./config/winston');// logger
const morgan = require('morgan');// http logger
/**[END] 모듈 선언*/

/**[START] 모듈 전처리 */

morgan.format('myformat', ' :method :url" :status :res[content-length] - :response-time ms');
/**[END] 모듈 전처리 */

/**[START] 모듈 적용*/
app.use(cors());            //CORS 허용 설정
app.use(bodyParser.json()); //request body로 넘어오는 데이터를 json으로 변환
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('myformat', {stream: logger.stream}));
/**[END] 모듈 적용*/

/**[START] 기타 설정*/
//app.use(express.static('public/js'));//static한 요소들 저장
/**[END] 기타 설정*/


/**[START] router 선언영역*/
let users = require('./routes/users.js');
let auth = require('./routes/auth.js');
let product = require('./routes/product.js');
/**[END] router 파일 선언영역*/

/**[START] router 적용영역*/
app.use('/', users);
app.use('/', auth);
app.use('/', product);
/**[END] router 파일 적용영역*/

//서버 start
app.listen(PORT, function() {
    logger.info('Server listening on '+PORT+' . . .');
});