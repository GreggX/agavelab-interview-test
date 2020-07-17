cd /app/agavelab/

if [ ! "$(ls -A ./node_modules)" ]; then
    npm install
fi

npm start