const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send({hello:'world'});
});

app.listen(3000, function() {
    console.log('Server listening on Port 3000 . . .');
});