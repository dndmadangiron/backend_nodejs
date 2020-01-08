## this file must be located at project directory. ##

# 1. git pull
OUTPUT="$(git pull)"
echo "${OUTPUT}"

if [$? -eq 0]; then
	echo "git pull SUCCESS"
else 
	echo "git pull FAIL"
	return;
fi


# 2. npm install (install project dependency)
OUTPUT2="$(npm install)"
echo "${OUTPUT2}"

if [$? -eq 0]; then
	echo "npm install SUCCESS"
else 
	echo "npm install FAIL"
	return;
fi

# 3. restart pm2 (app)
OUTPUT3="$(pm2 restart app --watch --ignore-watch=\"logs/*\")"
echo "${OUTPUT3}"
if [$? -eq 0]; then
	echo "app restart SUCCESS"
else
	echo "app restart FAIL"
	return;
if

