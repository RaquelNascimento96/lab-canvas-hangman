class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord()
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10
  
  }

  pickWord() {
    return this.words[Math.floor(Math.random()*this.words.length)] 
   }

  checkIfLetter(keyCode) {
    if (keyCode>=65 && keyCode<=90) {
      return true
    } else {
      return false
    }
  }

  checkClickedLetters(letter) {
    if (this.letters.includes(letter)) {
      return false
    } else {
      return true
    }
  }

  addCorrectLetter(letter) {
      this.guessedLetters+=letter
  }

  addWrongLetter(letter) {
    this.errorsLeft-=1;
    if(!this.letters.includes(letter)){
      this.letters.push(letter)
    }
  }

  checkGameOver() {
    if(this.errorsLeft>1) {
      return false
    } else {
      return true
    }
  }

  checkWinner() {
    for (let i=0; i<this.secretWord.length; i++){
      if(this.guessedLetters.includes(this.secretWord[i])){
        continue
      } else {
        return false
      }
    }
    return true
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
     hangman.secretWord = hangman.pickWord();
     hangmanCanvas = new HangmanCanvas(hangman.secretWord);
     hangmanCanvas.createBoard()
    // ... your code goes here
  });
}



document.addEventListener('keydown', event => {
  if (hangman.checkIfLetter(event.keyCode) && hangman.checkClickedLetters(event.key)) {
    if (hangman.secretWord.includes(event.key)) {
        let index = hangman.secretWord.indexOf(event.key)
        hangmanCanvas.writeCorrectLetter(index)
         if(hangman.checkWinner()) {
           hangmanCanvas.winner()
         }
      } else {
        hangman.addWrongLetter(event.key);
        hangmanCanvas.writeWrongLetter(event.key, hangman.errorsLeft);
        hangmanCanvas.drawHangman(hangman.errorsLeft);
         if(hangman.checkGameOver()){
           hangmanCanvas.gameOver()
         }
      }
  }
  
});
