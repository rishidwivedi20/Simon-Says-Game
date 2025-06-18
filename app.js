//  for highscore to be saved even after refreshing the browser, add this at the top:
let highestScore = localStorage.getItem("highestScore") || 0;

let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];// for randomly choosing

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started");
    }
    started = true;
    levelUp();
});

function levelUp(){
    userSeq = [];

    level++;
    h2.innerText = `Level ${level}`;

    // a random button is choosed we can choose a random index from btns array
    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(function(){
        btn.classList.remove("gameFlash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);  
}

function checkAns(idx){
    // let idx = level-1; //fixed index
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);    
        }
    } else {
        if(level > highestScore){
            highestScore = level;
            localStorage.setItem("highestScore", highestScore);
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> </br>highestScore :<b> ${highestScore}</b></br>Press any key to start.`;
        
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}


function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);

}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress );
}


function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

 