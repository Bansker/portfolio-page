
const gameCard      = document.querySelectorAll('.l-rps-card');
const resultMsg     = document.querySelector('.l-game-result p');
const rps           = ['scissors', 'paper', 'rock'];

usr = gameCard.forEach((card) => {
  card.addEventListener('click', () => {
    const rn        = Math.floor(Math.random() * 3);
    const rpsIndex  = rps.indexOf(card.id);
    
    console.log(`You chose ${card.id}\nComputer chose ${rps[rn]}`);
    
    if(rn == rpsIndex) {
      resultMsg.textContent = `${card.id.toUpperCase()} vs. ${rps[rn].toUpperCase()}: Its a draw...`;
  
    } else if((rpsIndex == rn + 1 ) || (rn == rpsIndex + 2)) {
      resultMsg.textContent = `${card.id.toUpperCase()} vs. ${rps[rn].toUpperCase()}: You Lost!`;
      
    } else {
      resultMsg.textContent = `${card.id.toUpperCase()} vs. ${rps[rn].toUpperCase()}: You Won!`;
    }
  });
});



 