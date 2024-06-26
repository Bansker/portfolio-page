const cardRock = document.querySelector('#rock');
const cardPaper = document.querySelector('#paper');
const cardScissors = document.querySelector('#scissors');
const gameCard = document.querySelectorAll('.l-rps-card');

gameCard.forEach((card) => {
  console.log(card.id);


  card.addEventListener('click', () => {
    console.log(`${card.id}`);
  });


});


/* 
const rn        = Math.floor(Math.random() * 3);
const rps       = ['scissors', 'paper', 'rock'];
// const usrin     = prompt('Rock Paper or Scissors').trim().toLowerCase();
const rpsIndex  = rps.indexOf(usrin);



console.log(`You chose ${usrin}\nComputer chose ${rps[rn]}`);

if(rn == rpsIndex) {
  console.log('Its a draw...');

} else if((rpsIndex == rn + 1 ) || (rn == rpsIndex + 2)) {
  console.log('You Lost!');
  
} else {
  console.log('You Won!'); 
}
 */