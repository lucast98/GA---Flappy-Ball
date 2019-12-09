
function Pipe() {
  this.spacing = 175; //espaço (altura) entre canos
  this.top = random(height / 6, 3 / 4 * height);
  this.bottom = height - (this.top + this.spacing);
  this.x = width;
  this.w = 80;
  this.speed = 6;
  this.passed = false;
  this.highlight = false;

  /** Funcao que informa se o passaro bateu em um obstaculo ou nao */
  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true; //deixa o obstaculo vermelho
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  /** Funcao que informa se o passaro passou um obstaculo ou nao */
  this.pass = function(bird) {
    if (bird.x > this.x && !this.passed) {
      this.passed = true;
      return true;
    }
    return false;
  }

  /** Imprime um obstaculo na tela */
  this.show = function() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }

  /** Atualiza a velocidade dos canos */
  this.update = function() {
    this.x -= this.speed;
  }

  /** Indica se o obstaculo esta na tela ou nao */
  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}
