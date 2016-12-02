const setupString = `Faerun to Norrath = 129
Faerun to Tristram = 58
Faerun to AlphaCentauri = 13
Faerun to Arbre = 24
Faerun to Snowdin = 60
Faerun to Tambi = 71
Faerun to Straylight = 67
Norrath to Tristram = 142
Norrath to AlphaCentauri = 15
Norrath to Arbre = 135
Norrath to Snowdin = 75
Norrath to Tambi = 82
Norrath to Straylight = 54
Tristram to AlphaCentauri = 118
Tristram to Arbre = 122
Tristram to Snowdin = 103
Tristram to Tambi = 49
Tristram to Straylight = 97
AlphaCentauri to Arbre = 116
AlphaCentauri to Snowdin = 12
AlphaCentauri to Tambi = 18
AlphaCentauri to Straylight = 91
Arbre to Snowdin = 129
Arbre to Tambi = 53
Arbre to Straylight = 40
Snowdin to Tambi = 15
Snowdin to Straylight = 99
Tambi to Straylight = 70`;

// used to lookup what index a name is
var cities = [];

// using a matrix representation
var distances = [];

setupString.split('\n').forEach(function(str) {
  const parts = str.split(' = ');
  const dist = parseInt(parts[1]);

  const cityParts = parts[0].split(' to ');
  const city1 = cityParts[0];
  let city1Index = cities.indexOf(city1);
  if (city1Index === -1) {
    city1Index = cities.length;
    cities.push(city1);

    let newDist = [];
    for (let i = 0; i < distances.length; i++) {
      distances[i].push(-1);
      newDist.push(-1);
    }
    newDist.push(0);
    distances.push(newDist);
  }

  const city2 = cityParts[1];
  let city2Index = cities.indexOf(city2);
  if (city2Index === -1) {
    city2Index = cities.length;
    cities.push(city2);

    let newDist = [];
    for (let i = 0; i < distances.length; i++) {
      distances[i].push(-1);
      newDist.push(-1);
    }
    newDist.push(0);
    distances.push(newDist);
  }

  distances[city1Index][city2Index] = dist;
  distances[city2Index][city1Index] = dist;
});

const totalCities = cities.length;

var runners = [];
for (let i = 0; i < totalCities; i++) {
  runners.push({start: i, visited: [i], total: 0});
}

for (let iter = 1; iter < totalCities; iter++) {
  var newRunners = runners.reduce(function(newRunners, runner) {
    return newRunners.concat(spawnRunners(runner));
  }, []);

  runners = newRunners;
}

// console.log(runners);

console.log(runners.reduce(function(min, runner) {
  return Math.max(min, runner.total);
}, runners[0].total));

function spawnRunners(runner) {
  var newRunners = [];
  const last = runner.visited[runner.visited.length - 1];

  for (let i = 0; i < totalCities; i++) {
    if (last === i || distances[last][i] === -1) {
      continue;
    }

    if (runner.visited.indexOf(i) !== -1) {
      continue;
    }

    newRunners.push({
      start: runner.start,
      visited: runner.visited.concat(i),
      total: runner.total + distances[last][i]
    });
  }

  return newRunners;
}
