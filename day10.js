var num = '1321131112';

function looknsay(num) {
  var newNum = [];

  var last = num[0];
  var count = 1;

  for (let i = 1; i < num.length; i++) {
    let c = num[i];

    if (c === last) {
      count++;
    } else {
      newNum.push(count);
      newNum.push(last);

      last = c;
      count = 1;
    }
  }

  // always do the very end
  newNum.push(count);
  newNum.push(last);

  return newNum.join('');
}

for (let i = 0; i < 50; i++) {
  num = looknsay(num);
}

console.log(num.length);
