const word = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');


const words = ['application', 'programming', 'interface', 'inheritance'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];


function displayWord() {
  word.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ""}
        </span>
      `).join('')
    }
  `;

  const innerWord = word.innerText.replace(/\n/g, '');


  if(innerWord === selectedWord) {
    finalMessage.innerText = `Congratulations! You won! 😃`;

    popup.style.display = 'flex'
  }
}



function updateWrongLettersEl() {

  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;


  figureParts.forEach((part, index) => {
    const error = wrongLetters.length;

    if(index < error) {
      part.style.display = "block";
    }
    else {
      part.style.display = "none";
    }
  });



  if(wrongLetters.length === figureParts.length) {
    finalMessage.innerText = `You lost. 😕 Try again, don\'t give up!`;
    popup.style.display = 'flex';
  }
}


// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
  if(e.key >= 'a' && e.key <= 'z') {
    const letter = e.key;

    if(selectedWord.includes(letter)) {
      if(!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification()
      }
    } else {
      if(!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});



playAgainBtn.addEventListener('click', () => {

  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
});



displayWord();