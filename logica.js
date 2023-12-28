// Piedra papel y tijeras vs computadora:
const gameBoard = document.getElementById('Juego');// div principal

// modulo inicio:
const startingModule = document.createElement('div');
startingModule.classList.add('starting-module');

const greeting = document.createElement('h2');
greeting.classList.add('saludo-inicio');
greeting.innerText = 'Hola! Bienvenido al juego de piedra papel o tijeras!'

const gameRules = document.createElement('p');
gameRules.classList.add('game-rule');
gameRules.innerHTML = 'Las reglas del juego son las siguientes:<br>' + " <ul><li>Tenes que elegir una de las tres opciones que se te van a mostrar en la pantalla.</li> <li>Cuando cliquees en una, la computadora va a elegir su respuesta de manera aleatoria.</li><li>En el caso de que tengan la misma respuesta la ronda terminara en empate.</li> <li>Tene en cuanta que: la piedra solo vence a la tijera, la tijera solo vence al papel y el papel solo vence a la piedra.</li> <li>El primero que llegue a los 5 puntos, sera el ganador!</li><li>Una vez que hayas entendido las reglas, podes empezar con el juego dandole click al boton de iniciar.</li></ul>";


const startBtn = document.createElement('button');
startBtn.classList.add('starting-btn');
startBtn.innerText = 'Iniciar'

startingModule.append(greeting,gameRules,startBtn);
gameBoard.append(startingModule)

//---------------------------------------------





const contenedorBotones = document.createElement('div');//contenedor botones
gameBoard.append(contenedorBotones);
contenedorBotones.classList.add('contenedor-btn');


const btnPiedra = document.createElement('button');//btn piedra
btnPiedra.innerText='Piedra';
btnPiedra.classList.add("btn");
btnPiedra.addEventListener('click',()=>{
    console.log('funciona la piedra')
    singleRound('piedra',getComputerChoice())
})

const btnTijera = document.createElement('button');//btn tijera
btnTijera.innerText='Tijera';
btnTijera.classList.add("btn")
btnTijera.addEventListener('click',()=>{
    console.log('funciona la tijera')
    singleRound('tijera',getComputerChoice())
})

const btnPapel = document.createElement('button');//btn papel
btnPapel.innerText='Papel';
btnPapel.classList.add("btn");
btnPapel.addEventListener("click",()=>{
    console.log('Funciona el papel')
    singleRound('papel',getComputerChoice())
})


contenedorBotones.append(btnPapel,btnPiedra,btnTijera);

const resultModule = document.createElement('div');//modulo de resultado
gameBoard.append(resultModule);
resultModule.classList.add('resultado-modulo');

const scoreCountdown = document.createElement('div');//contador de puntos 
scoreCountdown.classList.add('score-countdown')

const playerScoreCountdown = document.createElement('p');//contador de puntos de jugador 
playerScoreCountdown.classList.add('player-score-countdown');

const computerScoreCountdown = document.createElement('p');//contador de puntos de computadora 
computerScoreCountdown.classList.add('computer-score-countdown');

scoreCountdown.append(playerScoreCountdown,computerScoreCountdown);
gameBoard.append(scoreCountdown);

const loadingAnimation = document.createElement('div');//animacion de carga 
loadingAnimation.classList.add('loading')
loadingAnimation.style.display = 'none'
gameBoard.append(loadingAnimation)

// LOGICA PIEDRA,PAPEL,TIJERAS:
contenedorBotones.style.display = 'none';

startBtn.addEventListener('click',()=>{
    startingModule.style.display = 'none';
    contenedorBotones.style.display = 'flex'
})

const getComputerChoice = () =>{
    // va a devololver de mandera aleatoria piedra papel o tijera
    let decision = Math.round(Math.random()*2+1)
    //El math.round va a hacer que el numero pase a ser entero, dentro coloco el math.random, que va a generar un numero aleatorio entre 0 y 1, pero al multiplicarlo por 2, va a generar un numero aleatorio entre 0 y 2, pero como necesito que sea un numero entre 1 y 3, al valor de la multiplicacion le sumo 1
    if (decision === 1){
        return "piedra"
        
    }else if(decision === 2){
        return "papel"
    }else {
        return "tijera"
    }
    
}


// console.log(getComputerChoice())
let playerScore = 0;
let computerScore = 0;

function singleRound(playerSelection,computerSelection) {
    loadingAnimation.style.display = 'block'
    setTimeout(()=>{
        console.log('Player choice:', playerSelection);
        console.log('Computer choice:', computerSelection);
        if (playerSelection === computerSelection){
            console.log('La ronda termino en empate')
            resultModule.innerText = 'La ronda termino en empate'
        } else if(
        (playerSelection==='piedra'&& computerSelection==='tijera')||
        (playerSelection==='papel'&& computerSelection==='piedra')||
        (playerSelection==='tijera'&& computerSelection==='papel')
        ){
            console.log('Felicidades, ganaste');
            resultModule.innerText = 'Ganaste! la computadora eligio: '+computerSelection
            playerScore++;
            playerScoreCountdown.innerText = 'Player-Score:'+playerScore
        } else {
            console.log('Que lastima, perdiste!');
            resultModule.innerText = 'Perdiste!la computadora eligio: ' + computerSelection
            computerScore++;
            computerScoreCountdown.innerText = 'Computer-Score:'+computerScore;
        };  


        if (playerScore === 5) {
            setTimeout(() => {
                resultModule.innerText = 'Felicidades, has ganado el juego!';
                playerScore = 0;
                computerScore = 0;
                playerScoreCountdown.innerText = 'Player-Score:'+playerScore;
                computerScoreCountdown.innerText = 'Computer-Score:'+computerScore;
            }, 1000);
        } else if (computerScore === 5) {
            setTimeout(() => {
                resultModule.innerText = 'Que lastima has perdido el juego!';
                playerScore = 0;
                computerScore = 0;
                playerScoreCountdown.innerText = 'Player-Score:'+playerScore;
                computerScoreCountdown.innerText = 'Computer-Score:'+computerScore;
                
            }, 1000);
        }
        loadingAnimation.style.display = 'none'
    },1000)
    
}

// console.log(singleRound())


// for (let i = 0; i<5; i++){
//     const playerSelection = 'piedra'.toLowerCase();
//     const computerSelection = getComputerChoice();
//     console.log(singleRound(playerSelection,computerSelection))
// }