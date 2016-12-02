const fs = require('fs');
const strings = fs.readFileSync('day8-data.txt', 'utf-8');

console.log(
  strings.split('\n').reduce(function(total, string) {
    // let realLength = string.length - 2;
    // for (var i = 1; i < string.length; i++) {
    //   if (string[i] === '\\') {
    //     if (string[i + 1] === 'x') {
    //       i += 3;
    //       realLength -= 3;
    //     } else {
    //       i++;
    //       realLength--;
    //     }
    //   }
    // }

    let expandLength = 2;
    for (var i = 0; i < string.length; i++) {
      if (string[i] === '\\' || string[i] === '"') {
        expandLength++;
      }
    }

    // console.log(string);
    // console.log(string.length);
    // console.log(realLength);

    return total + expandLength;//(string.length - realLength);
  }, 0)
);
