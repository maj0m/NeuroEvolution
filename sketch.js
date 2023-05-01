let agents = [];
let obstacles = [];

let brain;
let totalAlive;
let totalGenerations = 1;
let highScore = 0;

const totalAgents = 100;
const totalBreeders = 5;
const mutationChance = 0.05;
const obstacleCount = 5;
const obstacleDistance = 400;
const obstacleSpeed = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  obstacles = createObstacles();
  agents = createAgents();
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

  drawHUD(windowWidth - 550, 0);
  
  if(totalAlive == 0) {
    totalGenerations += 1;
    obstacles = createObstacles();

    for(let i = 0; i < agents.length; i++) {
      if(agents[i].score > highScore) {
        highScore = agents[i].score;
      }
    }
    agents = newGeneration();
  }
}

function drawHUD(x, y) {
  textSize(20);

  for(let agent of agents) {
    if(agent.alive) {
      agent.brain.draw(x + 100, y + 200);
      text('Score: ' + agent.score, x + 50, y + 90);
      break;
    }
  }

  text('Generation: ' + totalGenerations, x + 50, y + 50);
  text('Alive: ' + totalAlive, x + 50, y + 70);
  text('High Score: ' + highScore, x + 50, y + 110);
}

function createObstacles() {
  let newObstacles = [];
  for(let i = 0; i < obstacleCount; i++) {
    let ob = new Obstacle(800 + i*obstacleDistance, random(windowHeight/4, 3*windowHeight/4));
    newObstacles.push(ob);
  }
  return newObstacles;
}

function createAgents() {
  let newAgents = [];
  for(let i = 0; i < totalAgents; i++) {
    let agent = new Agent(new Brain(3, 12, 1));
    newAgents.push(agent);
  }
  return newAgents;
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
