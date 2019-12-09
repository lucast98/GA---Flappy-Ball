function nextGen(){
    gen++;
    genQtd = TOTAL;
    setFitness();
    for(let i = 0; i < TOTAL; i++){
        birds[i] = pickOne();
    }
    savedBirds = [];
}

/** Função para escolher um dos passaros que sofrerá mutação na proxima geracao */
function pickOne(){
    var index = 0;
    var r = random(1);

    while(r > 0){
        r = r-savedBirds[index].fitness;
        index++;
    }
    index--;

    let bird = savedBirds[index];
//    console.log(index);
    let child = new Bird(bird.brain);
    child.mutate();
 //   window.alert("oi");
    return child;
}

/** Função que determina o valor de fitness de cada passaro */
function setFitness(){
    let sum = 0;
    for(let bird of savedBirds){
        sum += bird.score;
    }

    for(let bird of savedBirds){
        bird.fitness = bird.score / sum; //normaliza os valores de fitness
    }
}