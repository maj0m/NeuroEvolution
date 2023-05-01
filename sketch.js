let agents = [];
let obstacles = [];

let brain;
let totalAlive;
let totalGenerations = 0;
let highScore = 0;

const totalAgents = 200;
const totalBreeders = 5;
const mutationChance = 0.01;
const obstacleCount = 5;
const obstacleDistance = 400;
const obstacleSpeed = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  for(let i = 0; i < obstacleCount; i++) {
    let ob = new Obstacle(800 + i*obstacleDistance, random(windowHeight/4, 3*windowHeight/4));
    obstacles.push(ob);
  }

  for(let i = 0; i < totalAgents; i++) {
    let agent = new Agent(new Brain(3, 12, 1));
    agents.push(agent);
  }


  // agent1 = new Agent(400, 400, 24, brain);
  // agents.push(agent1); 
}



function draw() {
  background(50);

  for(ob of obstacles) {
    ob.update();
    ob.draw();
  }

  totalAlive = 0;
  for(agent of agents) {
    if(agent.alive) {
      totalAlive += 1;
      agent.update();
      agent.draw();
    }
  }

  for(let i = 0; i < agents.length; i++) {
    if(agents[i].alive) {
      rect(16 * windowWidth/20,0, 400, 400);
      agents[i].brain.draw(17 * windowWidth/20, windowHeight/20);
      break;
    }
  }


  textSize(30);
  text('Generation: ' + totalGenerations, 20, 30);
  text('Alive: ' + totalAlive, 20, 60);
  text('High Score: ' + highScore, 20, 90);
  
  if(totalAlive == 0) {
    totalGenerations += 1;

    for(let i = 0; i < obstacleCount; i++) {
      obstacles[i].pos.x = 800 + i * obstacleDistance;
    }

    
    for(let i = 0; i < agents.length; i++) {
      if(agents[i].score > highScore) {
        highScore = agents[i].score;
      }
    }
    agents = newGeneration();
  }
}



function keyPressed() {
  if(keyCode == 32) {
      for(agent of agents) {
      agent.alive = true;
      agent.pos.y = 400;
    }
    
    for(let i = 0; i < 5; i++) {
      obstacles[i].pos.x = 800 + i * 400;
    }
  }
}

function newGeneration() {
  let bestParents = [];
  let newGen = [];

  for(let x = 0; x < totalBreeders; x++) {
    let bestScore = 0;
    let bestAgent = null;
    
    for(let i = 0; i < agents.length; i++) {
      if(agents[i].score > bestScore) {
        bestScore = agents[i].score;
        bestAgent = agents[i];
      }
    }
   
    bestParents.push(bestAgent);
    agents.splice(agents.indexOf(bestAgent), 1);
  }

  
  for(let i = 0; i < totalAgents; i++) {
    let parentA = bestParents[floor(random(0, totalBreeders))];
    let parentB = bestParents[floor(random(0, totalBreeders))];
    let childBrain = parentA.brain.crossOver(parentB.brain);
    childBrain.mutate(mutationChance);
    let child = new Agent(childBrain);
    newGen.push(child);
  }

  return newGen;
}
