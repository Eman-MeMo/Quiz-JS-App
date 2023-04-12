const questions = [
  {
    question:
      "Among the given statements, which statement defines closures in JavaScript?",
    answers: [
      {
        ques: "JavaScript is a function that is enclosed with references to its inner function scope",
        correct: false,
      },
      {
        ques: "JavaScript is a function that is enclosed with references to its lexical environment",
        correct: true,
      },
      {
        ques: " JavaScript is a function that is enclosed with the object to its inner function scope",
        correct: false,
      },
      { ques: "None of the mentioned", correct: false },
    ],
  },
  {
    question:
      "Arrays in JavaScript are defined by which of the following statements?",
    answers: [
      { ques: "It is an ordered list of values", correct: true },
      { ques: "It is an ordered list of objects", correct: false },
      { ques: "It is an ordered list of string", correct: false },
      { ques: "It is an ordered list of functions", correct: false },
    ],
  },
  {
    question: "Which of the following is not javascript data types?",
    answers: [
      { ques: "Null type", correct: false },
      { ques: "Undefined type", correct: false },
      { ques: "Number type", correct: false },
      { ques: "All of the mentioned", correct: true },
    ],
  },
  {
    question: " What is the basic difference between JavaScript and Java?",
    answers: [
      { ques: "Functions are considered as fields", correct: false },
      {
        ques: "Functions are values, and there is no hard distinction between methods and fields",
        correct: true,
      },
      { ques: "Variables are specific", correct: false },
      { ques: "There is no difference", correct: false },
    ],
  },
  {
    question: "Why JavaScript Engine is needed?",
    answers: [
      { ques: "Both Compiling & Interpreting the JavaScript", correct: true },
      { ques: "Parsing the javascript", correct: false },
      { ques: "Interpreting the JavaScript", correct: false },
      { ques: "Compiling the JavaScript", correct: false },
    ],
  },
  {
    question:
      "Which of the following methods/operation does javascript use instead of == and !=?",
    answers: [
      { ques: "JavaScript uses equalto()", correct: false },
      {
        ques: " JavaScript uses equals() and notequals() instead",
        correct: false,
      },
      { ques: "JavaScript uses bitwise checking", correct: false },
      { ques: " JavaScript uses === and !== instead", correct: true },
    ],
  },
  {
    question: " Which of the following is not an error in JavaScript?",
    answers: [
      { ques: "Missing of Bracket", correct: false },
      { ques: "Division by zero", correct: true },
      { ques: "Syntax error", correct: false },
      { ques: "Missing of semicolons", correct: false },
    ],
  },
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    answers: [
      { ques: "var", correct: false },
      { ques: "let", correct: false },
      { ques: "Both A and B", correct: true },
      { ques: "None of the mentioned", correct: false },
    ],
  },
  {
    question:
      "Which of the following methods can be used to display data in some form using Javascript?",
    answers: [
      { ques: "document.write()", correct: false },
      { ques: "console.log()", correct: false },
      { ques: "window.alert()", correct: false },
      { ques: "All of the mentioned", correct: true },
    ],
  },
  {
    question:
      "What keyword is used to check whether a given property is valid or not?",
    answers: [
      { ques: "in", correct: true },
      { ques: "is in", correct: false },
      { ques: "exists", correct: false },
      { ques: "lies", correct: false },
    ],
  },
];

let CurrQuestionInd = 0;
let score = 0;
let count = 15;
let countdown;
const startBox = document.getElementById("boxStart");
const quizBox = document.getElementById("box");
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("chooces");
const nextButton = document.getElementById("next-btn");
const timerSec = document.querySelector(".sec");

function startQuiz() {
  CurrQuestionInd = 0;
  score = 0;
  nextButton.innerHTML = "Next Question";
  showQuestion();
}
function showQuestion() {
  resetState();
  timerDisplay(count);
  let currQuestion = questions[CurrQuestionInd];
  let questionNum = CurrQuestionInd + 1;
  questionElement.innerHTML = questionNum + ". " + currQuestion.question;

  currQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.ques;
    button.classList.add("btn");
    answerElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectedAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
}

function selectedAnswer(ans) {
  clearInterval(countdown);
  const selectedAns = ans.target;
  const isCorrect = selectedAns.dataset.correct === "true";
  if (isCorrect) {
    selectedAns.classList.add("Correct");
    score++;
  } else {
    selectedAns.classList.add("inCorrect");
  }
  Array.from(answerElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("Correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  timerSec.innerHTML = `0 s`;
  if (score >= 5) {
    questionElement.innerHTML = `You pass this quiz successfully!<br> you scored ${score} out of ${questions.length}<br>
  <img src="success.gif">`;
    questionElement.classList.add("sucess");
  } else {
    questionElement.innerHTML = `Unfortunately you not pass this quiz!<br> you scored ${score} out of ${questions.length}<br>
    <img src="fail.gif">`;
    questionElement.classList.add("fail");
  }

  document.querySelector(".timer").style.display = "none";
}
nextButton.addEventListener("click", () => {
  if (CurrQuestionInd < questions.length) {
    CurrQuestionInd++;
    if (CurrQuestionInd < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  } else {
    startQuiz();
  }
});
function showQuiz() {
  startBox.style.display = "none";
  quizBox.style.display = "block";
}
function timerDisplay(num) {
  let counter = num;
  countdown = setInterval(() => {
    counter--;
    timerSec.innerHTML = `${counter} s`;
    if (counter == 0) {
      clearInterval(countdown);
      Array.from(answerElement.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("Correct");
        }
        button.disabled = true;
      });
      nextButton.style.display = "block";
    }
  }, 1000);
  this.count = 15;
}
startQuiz();
