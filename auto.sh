function run_cmd(){
    cmd=$1
    echo ${cmd}
    OUTPUT="$(${cmd})"
    echo "${OUTPUT}"
}

# 0. timezone setting(Asia/Seoul)
sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

# 1. move to project directory
move_to_prj="cd /node-app/server"
run_cmd move_to_prj

# 2. git pull
git_pull="git pull"
run_cmd git_pull

# 3. npm install (install project dependency)i
npm_install="npm install"
run_cmd npm_install

# 4. restart pm2 (app)
pm2_kill="pm2 kill"
run_cmd pm2_kill

APP_START="pm2 start --name=\"app\" app.js --watch --ignore-watch=\"logs/*\""
run_cmd APP_START

