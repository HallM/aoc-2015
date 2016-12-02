var password = 'hepxxyzz';

function replaceIndex(str, char, index) {
  return str.substr(0, index) + char + str.substr(index + 1);
}

function incrementIndex(index) {
  if (password[index] === 'z') {
    password = replaceIndex(password, 'a', index);
    incrementIndex(index - 1);
  } else {
    password = replaceIndex(password, String.fromCharCode(password.charCodeAt(index) + 1), index);
  }
}

function increment() {
  incrementIndex(7);
}

function isPassValid() {
  let lastdouble = null;
  let last = null;
  let twoAgo = null;

  let hasBothDoubles = false;
  let hasStraight = false;

  for (let i = 0; i < 8; i++) {
    const c = password[i];

    if (c === 'i' || c === 'o' || c === 'l') {
      return false;
    }

    if (last && last !== lastdouble && last === c) {
      if (lastdouble) {
        hasBothDoubles = true;
      } else {
        lastdouble = last;
      }
    }

    if (twoAgo && twoAgo.charCodeAt(0)+2 === c.charCodeAt(0) && last.charCodeAt(0)+1 === c.charCodeAt(0)) {
      hasStraight = true;
    }

    twoAgo = last;
    last = c;
  }

  return hasStraight && hasBothDoubles;
}

do {
// console.log(password);
  increment();
} while (!isPassValid());

console.log(password);
