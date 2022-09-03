const word = document.getElementById('word');
const scoreEl = document.getElementById('score');
const text = document.getElementById('text');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// list of words to be used in the game 

const words = [
    'emancipate',
    'enunciate',
    'cajole',
    'ignore',
    'implore',
    'nefarious', 
    'congenital',
    'siren',
    'rake',
    'quaint',
    'effortless',
    'Aristotilean',
    'amalgate',
    'comprehend',
    'fathom',
    'duke',
    'misogynist',
    'queen',
    'green',
    'tender'
]

// initializing the variables 

let randomWord;

let score = 0;

let time = 10;

// setting the value of the difficulty 

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// setting difficulty select value 

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// focusing on text on start 

text.focus();

// starting the countdown 

const timeInterval = setInterval(updateTime, 1000);

// generating random words from array 

function getRandom () { 
    return words[Math.floor(Math.random() * word.length)]
}

// adding words to the DOM 

function addWordToDOM () { 
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}


// updating the scores 

function updateScore () { 
    score++;
    scoreEl.innerHTML = score;
}

// updating the time 

function updateTime () { 
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) { 
        clearInterval(timeInterval);
        // ends the game

        gameOver();
    }
}

// showing the end screen once the game is over 

function gameOver () { 
    endgameEl.innerHTML = `
    <h1> Time ran out</h1>
    <p> Your final score is ${score}</p>
    <button onClick='location.reload()'>Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

addWordToDOM();

// the event listeners

// typing 

text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        // clearing 
        e.target.value = '';

        if (difficulty === 'hard') { 
            time +=2;
        } else if (difficulty === 'medium') { 
            time+= 3;
        } else { 
            time += 5;
        }
    }

    updateTime();
});

// settings button click

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// settings select 

settingsForm.addEventListener('change', e => { 
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});