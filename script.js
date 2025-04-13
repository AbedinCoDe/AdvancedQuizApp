// https://opentdb.com/api.php?amount=1


const _question = document.querySelector('#quistion');
const _correctScore = document.querySelector('#correct_score');
const _totalQuestion = document.querySelector('#total_Question');
const _option = document.querySelector('.quistion_Option');
const _checkbtn = document.querySelector('#check_Answere');
const _result = document.querySelector('.result');
const _playAgain = document.querySelector('#play_Again');

function fetchData (){
    _result.innerHTML = "";
    fetch(`https://opentdb.com/api.php?amount=1`)
    .then(res => res.json())
    .then((data) => displayData(data.results[0]));
}

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 2;


function eventListener(){
    _checkbtn.addEventListener('click', checkAnswer);
    _playAgain.addEventListener('click', restartGame);
}



document.addEventListener("DOMContentLoaded", () => {
    eventListener();
    fetchData();
    _correctScore.textContent = correctScore;
    _totalQuestion.textContent = totalQuestion;
})


function displayData(data){
    _checkbtn.disabled = false;
    correctAnswer = data.correct_answer;
    console.log(correctAnswer);
    let incorrectAnswer = data.incorrect_answers;
    let optionList = [...incorrectAnswer, correctAnswer];


    for(let i = optionList.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [optionList[i], optionList[j]] = [optionList[j], optionList[i]];
    }
    
    _question.innerHTML = `
        <p>${data.question} <br> <span class="category">${data.category}</span></p>
    `
    
    _option.innerHTML = `
        ${optionList.map((element, index) => `
                <li>${index + 1}. <span>${element}</span></li>
            `).join('')}

    `

    selectOption();
}


function selectOption(){
    _option.querySelectorAll('li').forEach(element => {
        element.addEventListener('click', () => {
            if(_option.querySelector('.selected')){
                let activeBtn = _option.querySelector('.selected');
                activeBtn.classList.remove('selected');
            }
            element.classList.add('selected');
        })
    })

}


function checkAnswer(){
    _checkbtn.disabled = true;

    if(_option.querySelector('.selected')){
        let selectedAnswer = _option.querySelector('.selected span').textContent;
        
        if(selectedAnswer.trim() == htmlDecode(correctAnswer)){
            correctScore++;
            _result.innerHTML = `
                <p><i class="fas fa-check"></i>Correct Answer</p>
            `
        }else{
            _result.innerHTML = `
                <p><i class="fas fa-check"></i>Wrong Answer <br> <b><small>Correct Answer: ${correctAnswer}</small></b></p>
            `
        }
    }else{
        _checkbtn.disabled = false;
        return _result.innerHTML = `
            <p><i class= "fas fa-question"></i>Please Select An Option</p>
        `
    }
    checkCount();
}


function htmlDecode(textString){
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

function checkCount(){
    askedCount++;
    setCount();
    if(askedCount == totalQuestion){
        _result.innerHTML = `
            <p>Your Score is: ${correctScore}</p>
        `
        _checkbtn.style.display = "none";
        _playAgain.style.display = "block";
    }else{
        setTimeout(() => {
            fetchData();
        }, 300)
    }
}

function setCount(){
    _correctScore.textContent = correctScore;
    _totalQuestion.textContent = totalQuestion;
}

function restartGame(){
    correctScore = askedCount = 0;
    _checkbtn.style.display = "block";
    _playAgain.style.display = "none";
    _checkbtn.disabled = false;
    setCount();
    fetchData();
}