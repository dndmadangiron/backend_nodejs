#!/bin/bash

##### [START] Declare common functions #####

# Execute and show result
exec_cmd(){
    echo $1
    OUTPUT="$($1)"
    echo "${OUTPUT}"
}

# Show help text
# option : h
help(){
    echo "./auto.sh [OPTIONS]"
    echo "          -h            Show help text"
    echo "          -n            Execute 'npm install' command and get new source"
    echo "          -r            Get new source and restart all process"
    echo "          -t TIMEZONE   Setting timezone and get new source (Recommand : Asia/Seoul)"
}

##### [END] Declare common functions #####

##### [START] Declare option functions #####

# Setting timezone (Recommand : Asia/Seoul)
# option : t
setTimezone(){
    timezone=$1
    if [ -z $timezone ]
    then
        timezone="Asia/Seoul"
    fi

    exec_cmd "sudo ln -sf /usr/share/zoneinfo/${timezone} /etc/localtime"
    exec_cmd "date"
}

# Execute 'npm install' command
# option : n
npmInstall(){
    exec_cmd "npm install"
}

# Restart all process
# option : r
restartServer(){
    exec_cmd "pm2 kill"
    exec_cmd "pm2 start --name=\"app\" app.js --watch --ignore-watch=\"/node-app/server/logs/*\""    
}

# Get new source
getNewSource(){
    exec_cmd "git pull"
    exec_cmd "pm2 list"
}

##### [END] Declare option functions #####

if (( $EUID == 0 ))
then
    echo "Please execute this script with 'sudo' command"
    exit 0
fi

while getopts "hnrt:" opt
do
    case $opt in
        n) npmInstall
           ;;
        r) restartServer
           ;;
        t) timezone=$OPTARG
           setTimezone "$timezone" ;;
        h) help 
           exit 0 ;;
        ?) help
           exit 0 ;;
    esac
done

getNewSource