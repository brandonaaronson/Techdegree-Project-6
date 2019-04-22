const qwerty        = document.getElementById('qwerty');
const phrase        = document.getElementById('phrase');
const overlay       = document.querySelector('#overlay');
const resetBtn      = document.querySelector('.btn__reset');
const ul            = phrase.querySelector('ul');
const phrases       = [
                        'that is going to leave a mark',
                        'how is that working out for you',
                        'seize the day',
                        'make love not war',
                        'howdy partner'
                    ];

let phraseArray = getRandomPhraseAsArray(phrases); 
const tries = document.querySelectorAll('.tries');
let missed = 0;
let letterFound = null;

// adds pointer cursor when hovering over start button 

resetBtn.addEventListener('mouseover', (e) =>{
    resetBtn.style.cursor = 'pointer';
});



// selects a random phrase from phrase array then splits phrase into an array of letters

function getRandomPhraseAsArray(arr){
    const random = arr[(Math.floor(Math.random() * arr.length))];
    const splitPhraseArray = random.split('');
    return splitPhraseArray;
}

// adds the phrase to the DOM

const addPhraseToDisplay = (arr) => {
    for (let i = 0; i < arr.length; i += 1) {
        let letter = arr[i];
        const li = document.createElement('li');
        li.textContent = letter
    if (letter !== ' ') {
        li.className = 'letter';
    }    else {
        li.className = 'space';
        }
    ul.appendChild(li);
    }
}

addPhraseToDisplay(phraseArray);

// checks whether the selected letter is a part of the phrase
// if not, produces null value

const checkLetter = (btnSelected) => {
    const letters = document.querySelectorAll('.letter');
    let match = false; 
    for (let i = 0; i < letters.length; i += 1) {
        if (btnSelected.toLowerCase() === letters[i].textContent) {
        match = true;
        letters[i].classList.add('show');
        letters[i].style.transition = '1s';  
        } 
    } if (match) {
    return btnSelected;         
    } else {
    return null;
    }
}

// creates a span element for overlay based on win/loss of the game and sets 
// text content of the span and 

const spanner = (result) => {
        overlay.className = result;
        span = document.createElement('span');
        span.className = 'span'
        span.style.fontSize = 'xx-large'; 
        overlay.appendChild(span);
        overlay.style.display = '';
        if (result === 'win') {
            span.textContent = 'Congratulations!  You won!';
            resetBtn.textContent = 'Restart?';
        } 
        else  {
            span.textContent = 'Please try again.';
            resetBtn.textContent = 'Try Again';
        }
        
}

// checks if the phrase has been solved or lives have been reduced to 0

const checkWin = () => {
    const show = document.querySelectorAll('.show');
    const letters = document.querySelectorAll('.letter');
    if (show.length === letters.length){
        spanner('win');
    } else if (missed >= 5){
        spanner('lose');
    }
    
};

// assigns class .chosen when clicked, disables selected button 
// tests against whether the letter is correct or not, and
// tests to see if we've won or lost the game

qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const chosen = e.target.textContent;
        e.target.classList.add('chosen');
        e.target.disabled = true;
        letterFound = checkLetter(chosen);
     
        if (letterFound === null) {
        tries[missed].style.display = 'none';
        missed += 1;
        }
    } checkWin();
});

// resets keyboard

function resetQwerty() {
    let keyboard = document.querySelectorAll('button');
    for (i = 0; i < keyboard.length; i +=1) {
    keyboard[i].removeAttribute('class');
    keyboard[i].disabled = false;
    keyboard[i].style.transition = 0; 
    }
}   

//resets span element on overlay

const resetSpan = () => {
    const span = overlay.querySelector('.span');
    overlay.removeChild(span);
};

// removes old phrase array from DOM, gets a new random phrase, adds phrase to display

const resetPhrase = () =>{
    let li = ul.querySelectorAll('li').forEach(li => li.remove());
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray); 
}
// resets heart count
const resetHearts = () => {
    for (let i = 0; i < tries.length; i += 1){
        tries[i].style.display = '';
    }
}

// function to reset everything at once
function resetGame(){
    resetSpan();
    resetHearts();
    resetQwerty();
    resetPhrase();
    missed = 0;
}

// starts or resets the game

resetBtn.addEventListener('click', (e) => { 
    overlay.style.display = 'none';
    if (resetBtn.textContent === 'Try Again' || resetBtn.textContent === 'Restart?') {
       resetGame();
    }
});