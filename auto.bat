REM pm2 kill

REM git pull

REM npm install

pm2 start --name=\"app\" app.js --watch --ignore-watch=\"logs/*\"
