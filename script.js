
const question = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]

    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican city", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Shri lanka", correct: false },
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
    {
        question: "Which is smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    }
];

const questionelement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;


function startquiz() {
    currentquestionindex = 0;
    score = 0;
    nextbutton.innerHTML = "next";
    showquestion();
}

function showquestion() {
    resetstate();
    let currentquestion = question[currentquestionindex];
    let questionNo = currentquestionindex + 1;
    questionelement.innerHTML = questionNo + ". " + currentquestion.question;

    currentquestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectanswer);
    });
}

function resetstate() {
    nextbutton.style.display = "none";
    while (answerbuttons.firstChild) {
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}

function selectanswer(e) {
    const selectedButton = e.target;
    const iscorrect = selectedButton.dataset.correct === "true";

    if (iscorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerbuttons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } button.disabled = true;
    });

    nextbutton.style.display = "block";
}

function showscore() {
    resetstate();
    questionelement.innerHTML = `your score ${score} out of ${question.length}!`;
    nextbutton.innerHTML = "play again";
    nextbutton.style.display = "block"

}


function handlethenexbuttion() {
    currentquestionindex++;
    if (currentquestionindex < question.length) {
        showquestion()
    } else {
        showscore();
    }
}
nextbutton.addEventListener("click", () => {
    if (currentquestionindex < question.length) {
        handlethenexbuttion();
    } else {
        startquiz();
    }
})
startquiz();
