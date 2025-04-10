

const _question = document.getElementById('quistion');
const _option = document.querySelector('.quistion_Option');
const _correctScore = document.getElementById('correct_score');
const _totalQuestion = document.getElementById('total_Question');
const _checkBtn = document.getElementById('check_Answere');
const _playAgain = document.getElementById('play_Again');
const _result = document.querySelector('.result');

let correctAnswer = "", correctScore = askCount = 0, totalQuestion = 10;

async function fetchApi(){
    let apiUrl = `https://opentdb.com/api.php?amount=1`
    let res = await fetch(`${apiUrl}`);
    let data = await res.json();
    displayQuestion(data.results[0])
}

function eventListener(){
    _checkBtn.addEventListener('click', checkAnswer);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchApi();
    eventListener();
    _correctScore.textContent = correctScore;
    _totalQuestion.textContent = totalQuestion;
})



function displayQuestion(data){
    console.log(data)
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers
    let optionList = incorrectAnswer
    
    optionList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);

    _question.innerHTML = `${data.question} <br> <span class="category">${data.category}</span>`;
    _option.innerHTML = `
        ${optionList.map((option, index) => 
        `
            <li>${index + 1}. <span>${option}</span></li>
        `
        ).join('')}
    `
    selectOption();
}

function selectOption() {
    _option.querySelectorAll('li').forEach((element) => {
        element.addEventListener('click', () => {
            if(_option.querySelector('.selected')){
                let activeButton = document.querySelector('.selected');
                activeButton.classList.remove('selected');
            }
            element.classList.add('selected');
        })
    })
}

function checkAnswer(){
    _checkBtn.disabled = true;

    if(_option.querySelector('.selected')){
        let selectedAnswer = _option.querySelector('.selected span').textContent
        if(selectedAnswer.trim() == htmlDecode(correctAnswer)){
            correctScore++;
            _result.innerHTML = `<p> <i class="fas fa-check"></i>Correct Answer</P>`
        }else{
            _result.innerHTML = `<p><i class="fas fa-times"></i>Incorrect Answer</p> <p><small><b>Correct Answer is:</b> ${correctAnswer}</small> </p>`
        }
    }
}

function htmlDecode(textString){
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}