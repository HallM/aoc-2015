/*
const input = `Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.`;
*/
const input = `Alice would lose 57 happiness units by sitting next to Bob.
Alice would lose 62 happiness units by sitting next to Carol.
Alice would lose 75 happiness units by sitting next to David.
Alice would gain 71 happiness units by sitting next to Eric.
Alice would lose 22 happiness units by sitting next to Frank.
Alice would lose 23 happiness units by sitting next to George.
Alice would lose 76 happiness units by sitting next to Mallory.
Bob would lose 14 happiness units by sitting next to Alice.
Bob would gain 48 happiness units by sitting next to Carol.
Bob would gain 89 happiness units by sitting next to David.
Bob would gain 86 happiness units by sitting next to Eric.
Bob would lose 2 happiness units by sitting next to Frank.
Bob would gain 27 happiness units by sitting next to George.
Bob would gain 19 happiness units by sitting next to Mallory.
Carol would gain 37 happiness units by sitting next to Alice.
Carol would gain 45 happiness units by sitting next to Bob.
Carol would gain 24 happiness units by sitting next to David.
Carol would gain 5 happiness units by sitting next to Eric.
Carol would lose 68 happiness units by sitting next to Frank.
Carol would lose 25 happiness units by sitting next to George.
Carol would gain 30 happiness units by sitting next to Mallory.
David would lose 51 happiness units by sitting next to Alice.
David would gain 34 happiness units by sitting next to Bob.
David would gain 99 happiness units by sitting next to Carol.
David would gain 91 happiness units by sitting next to Eric.
David would lose 38 happiness units by sitting next to Frank.
David would gain 60 happiness units by sitting next to George.
David would lose 63 happiness units by sitting next to Mallory.
Eric would gain 23 happiness units by sitting next to Alice.
Eric would lose 69 happiness units by sitting next to Bob.
Eric would lose 33 happiness units by sitting next to Carol.
Eric would lose 47 happiness units by sitting next to David.
Eric would gain 75 happiness units by sitting next to Frank.
Eric would gain 82 happiness units by sitting next to George.
Eric would gain 13 happiness units by sitting next to Mallory.
Frank would gain 77 happiness units by sitting next to Alice.
Frank would gain 27 happiness units by sitting next to Bob.
Frank would lose 87 happiness units by sitting next to Carol.
Frank would gain 74 happiness units by sitting next to David.
Frank would lose 41 happiness units by sitting next to Eric.
Frank would lose 99 happiness units by sitting next to George.
Frank would gain 26 happiness units by sitting next to Mallory.
George would lose 63 happiness units by sitting next to Alice.
George would lose 51 happiness units by sitting next to Bob.
George would lose 60 happiness units by sitting next to Carol.
George would gain 30 happiness units by sitting next to David.
George would lose 100 happiness units by sitting next to Eric.
George would lose 63 happiness units by sitting next to Frank.
George would gain 57 happiness units by sitting next to Mallory.
Mallory would lose 71 happiness units by sitting next to Alice.
Mallory would lose 28 happiness units by sitting next to Bob.
Mallory would lose 10 happiness units by sitting next to Carol.
Mallory would gain 44 happiness units by sitting next to David.
Mallory would gain 22 happiness units by sitting next to Eric.
Mallory would gain 79 happiness units by sitting next to Frank.
Mallory would lose 16 happiness units by sitting next to George.`;
/*
*/

// used to lookup what index a name is
var peeps = [];

// using a matrix representation
var happiness = [];

input.split('\n').forEach(function(str) {
  const parts = str.split(' ');
  const h = parseInt(parts[3]) * (parts[2] === 'lose' ? -1 : 1);

  const p1 = parts[0];
  let p1Index = peeps.indexOf(p1);
  if (p1Index === -1) {
    p1Index = peeps.length;
    peeps.push(p1);

    let newH = [];
    for (let i = 0; i < happiness.length; i++) {
      happiness[i].push(0);
      newH.push(0);
    }
    newH.push(0);
    happiness.push(newH);
  }

  const p2 = parts[10].substr(0, parts[10].length - 1);
  let p2Index = peeps.indexOf(p2);
  if (p2Index === -1) {
    p2Index = peeps.length;
    peeps.push(p2);

    let newH = [];
    for (let i = 0; i < happiness.length; i++) {
      happiness[i].push(0);
      newH.push(0);
    }
    newH.push(0);
    happiness.push(newH);
  }

  happiness[p1Index][p2Index] = h;
});

const matt = 'matt';
peeps.push(matt);

let newH = [];
for (let i = 0; i < happiness.length; i++) {
  happiness[i].push(0);
  newH.push(0);
}
newH.push(0);
happiness.push(newH);

console.log(happiness);

const totalPeeps = peeps.length;

var runners = [];
for (let i = 0; i < totalPeeps; i++) {
  runners.push({order: [i]});
}

for (let iter = 1; iter < totalPeeps; iter++) {
  var newRunners = runners.reduce(function(newRunners, runner) {
    return newRunners.concat(spawnRunners(runner));
  }, []);

  runners = newRunners;
  console.log(runners.length);
}

console.log(runners.reduce(function(min, runner, index) {
  const happies = runner.order.map(function(person, i, arr) {
    let left = i - 1;
    if (left < 0) {
      left += arr.length;
    }

    let right = i + 1;
    if (right >= arr.length) {
      right -= arr.length;
    }

    return happiness[person][arr[left]] + happiness[person][arr[right]];
  });

  const val = happies.reduce(function(count, v) {
    return count + v;
  }, 0);

  if (index === 0) {
    return val;
  }

  return Math.max(min, val);
}, 0));

function spawnRunners(runner) {
  var newRunners = [];

  for (let i = 0; i < totalPeeps; i++) {
    if (runner.order.indexOf(i) !== -1) {
      continue;
    }

    newRunners.push({
      order: runner.order.concat(i),
    });
  }

  return newRunners;
}
