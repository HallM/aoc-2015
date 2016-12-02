const key = 'bgvyzdsv';
const crypto = require('crypto');

var i = 1;

function isValid() {
  const str = [key, i].join('');
  const hash = crypto.createHash('md5').update(str).digest("hex");

  if (hash[0] === '0' && hash[1] === '0' && hash[2] === '0' && hash[3] === '0' && hash[4] === '0' && hash[5] === '0') {
    console.log(i);
    return true;
  }

  return false;
}

while (!isValid()) {
  i++;
}
