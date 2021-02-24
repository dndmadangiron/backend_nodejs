run_cmd(){
    echo $1
    OUTPUT="$($1)"
    echo "${OUTPUT}"
}

# 0. timezone setting(Asia/Seoul)
if (($EUID != 0)); then # not root
    sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
else 
    ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
fi

# 1. move to project directory
run_cmd "cd /node-app/server"

# 2. git pull
run_cmd "git pull"

# 3. npm install (install project dependency)i
run_cmd "npm install"

# 4. restart pm2 (app)
run_cmd "pm2 kill"

# 5. start node app (app)
run_cmd "pm2 start --name=\"app\" app.js --watch --ignore-watch=\"/node-app/server/logs/*\""

