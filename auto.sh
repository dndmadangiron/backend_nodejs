## this file must be located at project directory. ##

# 0. timezone setting(Asia/Seoul)
# sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
# 1. git pull
echo "> git pull"
OUTPUT="$(git pull)"
#if [$? -eq 0]; then
#	echo "git pull SUCCESS"
#else 
#	echo "git pull FAIL"
#fi
echo "${OUTPUT}"




# 2. npm install (install project dependency)i
echo "> npm install"
OUTPUT2="$(npm install)"
#if [$? -eq 0]; then
#	echo "npm install SUCCESS"
#else 
#	echo "npm install FAIL"
#fi
echo "${OUTPUT2}"



# 3. restart pm2 (app)
echo "> pm2 kill"
echo $(pm2 kill)
APP_START="pm2 start --name=\"app\" app.js --watch --ignore-watch=\"logs/*\""
echo "> ${APP_START}"
OUTPUT3="$(${APP_START})"
#OUTPUT3="$(pm2 restart app --watch --ignore-watch=\"logs/*\")"
#if [$? -eq 0]; then
#	echo "app restart SUCCESS"
#else
#	echo "app restart FAIL"
#if

echo "${OUTPUT3}"

