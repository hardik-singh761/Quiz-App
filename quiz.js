const quiz = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Chennai", correct: false },
      { text: "Delhi", correct: true },
      { text: "Mumbai", correct: false },
      { text: "Kolkata", correct: false },
    ],
  },
  {
    question: "Which is the largest planet?",
    answers: [
      { text: "Jupiter", correct: true },
      { text: "Earth", correct: false },
      { text: "Neptune", correct: false },
      { text: "Mars", correct: false },
    ],
  },
  {
    question: "What is atomic number of Iron?",
    answers: [
      { text: "20", correct: false },
      { text: "26", correct: true },
      { text: "32", correct: false },
      { text: "27", correct: false },
    ],
  },
  {
    question: "which is the highest peak?",
    answers: [
      { text: "Mt. Fuji", correct: false },
      { text: "Kanchanjunga", correct: false },
      { text: "Mt. Everest", correct: true },
      { text: "Marina Trench", correct: false },
    ],
  },
  {
    question: "Who is the PM of India?",
    answers: [
      { text: "Modi", correct: true },
      { text: "Rahul", correct: false },
      { text: "Mamta", correct: false },
      { text: "You", correct: false },
    ],
  },
];

const question = document.getElementById("question");
const options = document.getElementById("options");
const next = document.getElementById("next");

let index = 0;
let score = 0;

function startQuiz(e) {
  index = 0;
  score = 0;
  showQuestion();
}

function showQuestion(e) {
  question.classList.remove("big");
  document.querySelector("#score").innerHTML = "";
  next.disabled = true;
  question.innerHTML = quiz[index].question;
  quiz[index].answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("opt");
    options.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", (e) => {
      const isCorrect = e.target.dataset.correct === "true";
      if (answer.correct) {
        score++;
        button.classList.add("correct");
      } else {
        button.classList.add("incorrect");
      }
      Array.from(options.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
        next.disabled = false;
      });
    });
  });
}

function showScore() {
  question.innerHTML = "Total Score:";
  question.classList.add("big");
  options.innerHTML = "";
  if(score>2){
    document.querySelector("#score").innerHTML = `&#128512; ${score}/5 &#128512;`;
  }
  else{
    document.querySelector("#score").innerHTML = `&#128128; ${score}/5 &#128128`;
  }
  next.innerHTML = "Try Again";
}

function handle(e) {
  index++;
  if (index < quiz.length) {
    options.innerHTML = "";
    showQuestion();
  } else {
    showScore();
  }
}

next.addEventListener("click", (e) => {
  if (index < quiz.length) {
    handle();
  } else {
    options.innerHTML = "";
    startQuiz();
  }
});

startQuiz();
