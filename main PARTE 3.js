const images = [
   'images/dolphin.jpg', 'images/dolphin.jpg',
   'images/fish.jpg', 'images/fish.jpg',
   'images/shark.jpg', 'images/shark.jpg',
   'images/turtle.jpg', 'images/turtle.jpg',
   'images/whale.jpg', 'images/whale.jpg',
   'images/crab.jpg', 'images/crab.jpg'
];

let gameBoard = document.getElementById('gameBoard');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// Shuffle images
function shuffle(array) {
   for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
   }
}

shuffle(images);

// Create the cards
images.forEach((image, index) => {
   const card = document.createElement('div');
   card.classList.add('card');
   card.setAttribute('data-image', image);

   const img = document.createElement('img');
   img.src = image;
   card.appendChild(img);

   card.addEventListener('click', flipCard);
   gameBoard.appendChild(card);
});

// Flip card
function flipCard() {
   if (lockBoard || this === firstCard) return;

   this.classList.add('flipped');

   if (!firstCard) {
       firstCard = this;
   } else {
       secondCard = this;
       lockBoard = true;

       if (firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image')) {
           matches++;
           resetBoard();
       } else {
           setTimeout(unflipCards, 1000);
       }
   }

   // Check if all matches are found
   if (matches === images.length / 2) {
       setTimeout(() => alert('¡Felicidades! Has encontrado todos los pares.'), 500);
   }
}

// Unflip cards
function unflipCards() {
   firstCard.classList.remove('flipped');
   secondCard.classList.remove('flipped');
   resetBoard();
}

// Reset the board for the next turn
function resetBoard() {
   [firstCard, secondCard, lockBoard] = [null, null, false];
}
