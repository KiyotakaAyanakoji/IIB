const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'fonts');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream(path.join(dir, 'Inter_Bold.json'));
https.get('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json', function(response) {
  response.pipe(file);
});
