

const rn = Math.floor(Math.random() * 3);
const rps = ['scissors', 'paper', 'rock'];
console.log(rn);

usrin = prompt('Rock Paper or Scissors').trim().toLowerCase();
rpsIndex = rps.indexOf(usrin);
console.log(rps.indexOf(usrin));

console.log(`You chose ${usrin}\nComputer chose ${rps[rn]}`);

if(rn == rpsIndex) {
  console.log('Its a draw...');
} else if(rn < rpsIndex) {
  console.log('You Lost!');
} else {
  console.log('You Won!');
}
