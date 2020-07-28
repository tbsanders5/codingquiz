var questions = [
    {
      title: 'What HTML element do we use to apply Javascript?',
      choices: ['<div>', '<body>', '<script>', '<section>'],
      answer: '<script>'
        },
    {
      title: 'How would you call a function called myFunction()',
      choices: ['call myFunction()', 'return myFunction()', 'here little myFunction()!', 'myFunction()'],
      answer: 'myFunction()'
        },
    {
      title: 'How to write an IF statement for executing some code if "i" is not equal to 5?',
      choices: ['if(i!=5)','if i<>5', 'if i=!5 then', 'if(i<>5)'],
      answer: 'if(i!=5)'
        },
    {
      title:  'How does a FOR loop start?',
      choices: ['for(i<= 5;i++)', 'for(i=0; i<=5; i++)', 'for(i=0; i<=5', 'for i=1 to 5'],
      answer: 'for(i=0; i<=5; i++)'
        },
    {
      title:  'How would you round the number 7.25 to the nearest integer',
      choices: ['Math.round(7.25)', 'rnd(7.25)', 'Math.rnd(7.25)', 'round(7.25)'],
      answer: 'Math.round(7.25)'
        }
  ];

var questionIndex = 0;
var time = questions.length * 15;
var timerId;

const questionElement = document.getElementById('questions');
const timeElement = document.getElementById('time');
const userChoiceElement = document.getElementById('user-choices');
const submitBtn = document.getElementById('submit');
const beginBtn = document.getElementById('begin');
const outputElement = document.getElementById('output');
const userInitElement = document.getElementById('user-initials');


function timerTick() {
    time--;
    timeElement.textContent = time;

    if (time <= 0) {
        challengeOver();
    }
}

function beginChallenge() {

    const beginFirstPage = document.getElementById('first-page')
    beginFirstPage.setAttribute('class', 'hide');

    questionElement.removeAttribute('class');

    timerId = setInterval(timerTick, 1000);

    timeElement.textContent = time;

    pullQuestion();
}

function pullQuestion() {

    let currentQuestion = questions[questionIndex];

    let questionHead = document.getElementById('question-header');
    questionHead.textContent = currentQuestion.title;

    userChoiceElement.innerHTML = '';

    currentQuestion.choices.forEach(function(choice, i) {

        let choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);

        choiceNode.textContent = i + 1 + '. ' + choice;

        choiceNode.onclick = questionClick;

        userChoiceElement.appendChild(choiceNode);

    });
}

function questionClick() {

    if (this.value !== questions[questionIndex].answer) {

        time -= 15;

        if (time < 0) {
            time = 0;
        }

        timeElement.textContent = time;

        outputElement.textContent = 'Incorrect!';
    } else {

        outputElement.textContent = 'Correct!';
    }

    outputElement.setAttribute('class', 'output');
    setTimeout(function() {
        outputElement.setAttribute('classs', 'output hide');
    }, 1000);

    questionIndex++;

    if (questionIndex === questions.length) {
        challengeOver();
    } else {
        pullQuestion();
    }
}

function challengeOver() {

    clearInterval(timerId);

    let finalScreenElement = document.getElementById('end-quiz');
    finalScreenElement.removeAttribute('class');

    let userScoreElement = document.getElementById('quiz-score');
    userScoreElement.textContent = time;

    questionElement.setAttribute('class', 'hide');
}

function saveScores() {

    let userInit = userInitElement.value.trim();

    if(userInit !== '') {

        let userScores = JSON.parse(window.localStorage.getItem('user-scores')) || [];

        let nextScore = {
            score: time,
            userInit: userInit
        }

        userScores.push(nextScore);
        window.localStorage.setItem('user-scores', JSON.stringify(userScores));

        window.location.href = "scores.html";
    }
}

function checkInput(event) {

    if (event.key === 'Enter') {
        saveScores();
    }
}

beginBtn.onclick = beginChallenge;

submitBtn.onclick = saveScores;

userInitElement.onkeyup = checkInput;

