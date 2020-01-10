## this file must be located at project directory. ##

# 0. timezone setting(Asia/Seoul)
# sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
# 1. git pull
echo "cd /home/ssh_user/server"
OUTPUT0="$(cd /home/ssh_user/server)"
echo "${OUTPUT0}"


echo "> git pull"
OUTPUT1="$(git pull)"

echo "${OUTPUT1}"




# 2. npm install (install project dependency)i
echo "> npm install"
OUTPUT2="$(npm install)"

echo "${OUTPUT2}"



# 3. restart pm2 (app)
echo "> pm2 kill"
echo $(pm2 kill)
APP_START="pm2 start --name=\"app\" app.js --watch --ignore-watch=\"logs/*\""
echo "> ${APP_START}"
OUTPUT3="$(${APP_START})"

echo "${OUTPUT3}"

