
const TOTAL = 250;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;

function setup() {
  createCanvas(640, 480);
  slider = createSlider(1,100,1);
  for (let i = 0; i < TOTAL; i++){
    birds[i] = new Bird();
  }
//  bird = new Bird();
  //pipes.push(new Pipe());
}

function draw() {

  for(let n = 0; n < slider.value(); n++){
    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
  
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].update();
      for(let j = birds.length-1; j >= 0; j--){
        if(pipes[i].hits(birds[j])){
          //console.log("HIT");
          savedBirds.push(birds.splice(j,1)[0]); //mata os passaros que batem nos canos e os salvam em um novo array
        }   
      }
  
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    for (let bird of birds){
      bird.think(pipes);
      bird.update();
    }
  
    /** Se todos os passaros de uma geração morrerem, será criada uma nova */
    if(birds.length === 0){
      counter = 0;
      nextGen();
      pipes = [];
    }
  }


  background(0);
  for(let bird of birds){
    bird.show();
  }
  for(let pipe of pipes){
    pipe.show();
  }

}

// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
// }
