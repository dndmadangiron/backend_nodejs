pm2 kill

if "%ERRORLEVEL%" == "0" (
    git pull
    if "%ERRORLEVEL%" == "0" (
        npm install
        if "%ERRORLEVEL%" == "0" (
            pm2 start --name=\"app\" app.js --watch --ignore-watch=\"logs/*\"
        ) else (
            echo "error while excute 'npm install' command"
        )
    ) else (
        echo "error while excute 'git pull' command"
    )
) else (
    echo "error while excute 'pm2 kill' command"
)
