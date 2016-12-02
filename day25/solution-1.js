var row = 1;
var col = 1;

// To continue, please consult the code grid in the manual.  Enter the code at row 3010, column 3019.
const targetRow = 3010;
const targetCol = 3019;

var code = 20151125;

while (row !== targetRow || col !== targetCol) {
  if (row === 1) {
    row = col + 1;
    col = 1;
  } else {
    row--;
    col++;
  }

  code = (code * 252533) % 33554393;
}

console.log('For row', row, 'column', col, 'code is: ', code);
