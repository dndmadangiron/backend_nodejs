const express = require('express');
const cors = require('cors');
const app = express();

//CORS 허용 설정
app.use(cors());

//서버 구축 테스트용
app.get('/', function(req, res) {
    res.send({hello:'world'});
});

//서버 구축 테스트용
app.listen(80, function() {
    console.log('Server listening on Port 80 . . .');
});