
const TOTAL = 250; /** Numero de passaros por geracao */
let birds = [];
let savedBirds = []; /** Passaros salvos */
let pipes = [];
let counter = 0; /**Contador usado para gerar obstaculos */
let slider; /** Objeto utilizado para acelerar a execucao */
var score = 0; /** Pontuacao atual */
var maxScore = 0; /** Pontuacao maxima */

/*function preload(){
 // pipeBodySprite = loadImage('images/pipeNorth.png');
 // pipePeakSprite = loadImage('images/pipeSouth.png');
 //birdSprite = loadImage('bird.png');
 // bgImg = loadImage('images/bg.png');
}*/

function setup() {
  createCanvas(640, 480); /** Cria o objeto onde são feitas as animacoes */
  slider = createSlider(1,100,1); /** Cria o slider */
  for (let i = 0; i < TOTAL; i++){ 
    birds[i] = new Bird(); /** Cria os passaros de uma geracao */
  }
  //bird = new Bird();
  //pipes.push(new Pipe());
}

function draw() {
  for(let n = 0; n < slider.value(); n++){
    if (counter % 75 == 0) {
      pipes.push(new Pipe()); /** Cria obstaculos */
    }
    counter++;
  
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].update();
      for(let j = birds.length-1; j >= 0; j--){
        if (pipes[i].pass(birds[j])) {
          score++; /** Incrementa a pontuacao se o passaro passa por um obstaculo */
        }
        if(pipes[i].hits(birds[j])){
          //console.log("...e morreu");
          savedBirds.push(birds.splice(j,1)[0]); /** mata os passaros que batem nos canos e os salvam em um novo array */
        }   
      }
  
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1); /** Remove o obstaculo que já nao esta na tela */
      }
    }
    for (let bird of birds){
      bird.think(pipes); /** Faz o passaro pensar na sua proxima decisao */
      bird.update(); /** Atualiza sua pontuacao e velocidade */
    }
  
    /** Se todos os passaros de uma geração morrerem, será criada uma nova */
    if(birds.length === 0){
      counter = 0;
      nextGen(); /** Cria nova geracao */
      pipes = []; /** Apaga os obstaculos atuais */
      reset(); /** Reseta a pontuacao para 0 */
    }
  }


  background(0);
  showScores();
  for(let bird of birds){
    bird.show();
  }
  for(let pipe of pipes){
    pipe.show();
  }
}

/** Indica a quantidade de obstaculos ultrapassados pelo passaro */
function showScores() {
  textSize(20);
  maxScore = max(score, maxScore);
  text('Pontos: ' + score, 1, 32);
  text('Melhor pontuacao: ' + maxScore, 1, 64);
}

/** Reseta a pontuacao para 0 */
function reset(){
  score = 0;
}

// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
// }
