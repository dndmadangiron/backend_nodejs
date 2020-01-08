## this file must be located at project directory. ##

# 0. timezone setting(Asia/Seoul)
# sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

# 1. git pull
OUTPUT="$(git pull)"
if [$? -eq 0]; then
	echo "git pull SUCCESS"
else 
	echo "git pull FAIL"
	return;
fi

echo "${OUTPUT}"




# 2. npm install (install project dependency)
OUTPUT2="$(npm install)"
if [$? -eq 0]; then
	echo "npm install SUCCESS"
else 
	echo "npm install FAIL"
	return;
fi

echo "${OUTPUT2}"



# 3. restart pm2 (app)
OUTPUT3="$(pm2 restart app --watch --ignore-watch=\"logs/*\")"
if [$? -eq 0]; then
	echo "app restart SUCCESS"
else
	echo "app restart FAIL"
	return;
if

echo "${OUTPUT3}"

