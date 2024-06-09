function playMove(player, gridState) {
  let usrInput;

  do {
    let err = 0;
    usrInput = prompt(`Enter coordinate to make a move ${player ? 'X':'O'}: `).trim().split("").map(Number);

    if(gridState[usrInput[0]][usrInput[1]] == 0) {
      err = 1;
      console.log('Coordinate is already set\n');

    } else {
      return gridState[usrInput[0]][usrInput[1]] = player ? 'X':'O';
    }
  } while(err == 1);
}

function printGrid(gridState) {
  console.log('  1   2   3');
  
  for(let i = 0; i <= 2; i++) {
    console.log(`${i + 1} ${gridState[i][0]} | ${gridState[i][1]} | ${gridState[i][2]}\n`);
  }
}

function checkGridState(gridState) {
  let state = 0;
  for(let i = 0; i <= 2; i++) {
    if(gridState[i] == (['X', 'X', 'X'] || ['O', 'O', 'O']))
      state = 1;
  }
}




function main() {
  let gridState = [[0, 0, 0],
                   [0, 0, 0],
                   [0, 0, 0]];

  console.log('Welcome to Tic Tac Console');


}

main();