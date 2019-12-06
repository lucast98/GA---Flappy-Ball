class Bird{
  constructor(brain){
    this.y = height/2;
    this.x = 64;

    this.gravity = 0.7;
    this.lift = -12;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;
    if(brain){
      this.brain = brain.copy();
    }
    else{
      this.brain = new NeuralNetwork(5,8,2);
    }
  }
  
  /** Exibe uma bolinha que representa um passaro */
  show(){
    stroke(255);
    fill(255,100);
    ellipse(this.x, this.y, 32, 32);
    //image(this.icon, this.x - this.width / 2, this.y - height / 2, this.width, height);
  }

  /** Faz o passaro pular */
  up(){
    this.velocity += this.lift;
  }

  /** Faz uma mutação de 1% no passaro */
  mutate(){
    this.brain.mutate(0.1);
    //window.alert("oi");
  }

  /** Funcao que representa o pensamento do passaro para sua proxima decisao */
  think(pipes) {
    let closest = null;
    let closestD = Infinity;
    for(let i = 0; i < pipes.length; i++){
      let d = (pipes[i].x + pipes[i].w) - this.x;
      if(d < closestD && d > 0){
        closest = pipes[i]; /** Obstaculo mais proximo */
        closestD = d; /** Distancia do obstaculo mais proximo */
      }
    }

    let inputs = []; /** Entradas da rede neural */
    inputs[0] = this.y / height; /** Altura normalizado pela altura do canvas */
    inputs[1] = closest.top / height; /** Altura do obstaculo superior mais proximo pela altura do canvas  */
    inputs[2] = closest.bottom / height; /** Altura do obstaculo inferior mais proximo pela altura do canvas */
    inputs[3] = closest.x / width; /** Posicao x do obstaculos mais proximo normalizado pela largura do canvas */
    inputs[4] = this.velocity / 10; /**  */

    let output = this.brain.predict(inputs); /** Saida da rede neural */
    if(output[0] > output[1]){
      this.up(); /** Passaro pula */
    }
  }

  /** Atualiza pontuacao e velocidade do passaro */
  update() {
    this.score++;
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

}
