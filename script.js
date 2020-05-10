const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let timerEl = document.querySelector('timer');
let timer = 60;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
	currentQuestionIndex++;
	setNextQuestion();
});

function startGame() {
	startButton.classList.add('hide');
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	currentQuestionIndex = 0;
	score = 0;
	timer = 60;
	questionContainerElement.classList.remove('hide');
	setNextQuestion();
}

var time = setInterval(function() {
	timer = timer - 1;
	if (timer === 0) {
		clearInterval(time);
		indexArray++;
	}
}, 1000);

function setNextQuestion() {
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
	questionElement.innerText = question.question;
	question.answers.forEach((answer) => {
		const button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add('btn');
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', selectAnswer);
		answerButtonsElement.appendChild(button);
	});
}

function resetState() {
	clearStatusClass(document.body);
	nextButton.classList.add('hide');
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
}

function selectAnswer(e) {
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct;
	setStatusClass(document.body, correct);
	Array.from(answerButtonsElement.children).forEach((button) => {
		setStatusClass(button, button.dataset.correct);
	});
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide');
	} else {
		startButton.innerText = 'Quiz Over! Enter Intials';
		startButton.classList.remove('hide');
	}
}

function setStatusClass(element, correct) {
	clearStatusClass(element);
	if (correct) {
		element.classList.add('correct');
	} else {
		element.classList.add('wrong');
	}
}

function clearStatusClass(element) {
	element.classList.remove('correct');
	element.classList.remove('wrong');
}

const questions = [
	{
		question: 'How would you save a CSS file?',
		answers: [ { text: 'style.css', correct: true }, { text: 'java.js', correct: false } ]
	},
	{
		question: 'Commonly used data types DO NOT include:',
		answers: [
			{ text: 'strings', correct: true },
			{ text: 'booleans', correct: true },
			{ text: 'alerts', correct: true },
			{ text: 'numbers', correct: true }
		]
	},
	{
		question: 'How do you create a function in JavaScript?',
		answers: [
			{ text: 'Function:myFunction()', correct: false },
			{ text: 'function myFunction()', correct: true },
			{ text: 'function = myFunction()', correct: false },
			{ text: 'None of the above', correct: false }
		]
	},
	{
		question: 'Booleans has more than 3 options',
		answers: [ { text: 'True', correct: false }, { text: 'False', correct: true } ]
	}
];
