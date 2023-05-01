class Agent {
    constructor(brain) {
        this.brain = brain;

        this.rad = 24;
        this.pos = createVector(300, 400);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.jumpForce = createVector(0, -10);
        this.maxVel = 10;
        
        this.nextObstacle = this.closestObstacle(obstacles);
        this.alive = true;
        this.score = 0;
        this.color = [random(100, 255), random(100, 255), random(100, 255)];
    }

    draw() {
      push();
      noStroke();
      fill(this.color);
      circle(this.pos.x, this.pos.y, this.rad*2);
      pop();
      //line(this.pos.x, this.pos.y, this.nextObstacle.pos.x, this.nextObstacle.pos.y);
    }

    update() {
      this.score += 1;
      this.nextObstacle = this.closestObstacle(obstacles);
      
      this.applyGravity(this.gravity);
      this.collisionCheck(obstacles);
      this.edgeOfScreen();

      let guess = this.brain.guess(this.nextObstacle.pos.x / windowWidth, this.nextObstacle.pos.y / windowHeight, this.pos.y / windowHeight);
      if(guess == 1) {
        this.jump();
      }
    }

    collisionCheck(obs) {
      for(let obstacle of obs) {
        if(this.pos.x >= obstacle.A.x && this.pos.x <= obstacle.B.x) {
          if(this.pos.y <= obstacle.A.y || this.pos.y >= obstacle.C.y) {
            this.alive = false;
          }
        }
      }
    }

    closestObstacle(obs) {
      let minDist = Infinity;
      let closest = null;
      for(let i = 0; i < obs.length; i++) {
        if(obs[i].B.x > this.pos.x) { // Only check if its infront of us
          let distance = dist(this.pos.x, this.pos.y, obs[i].pos.x, obs[i].pos.y);
          if(distance < minDist) {
            minDist = distance;
            closest = obs[i];
          }
        }
      }

      return closest;
    }

    jump() {
      this.vel.add(this.jumpForce.copy());
    }

    applyGravity() {
        let gravity = createVector(0, 0.5);
        this.acc.add(gravity);
        this.vel.add(this.acc);
        this.vel.limit(this.maxVel);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }


    edgeOfScreen() {
        if(this.pos.x < this.rad) {
          this.alive = false;
        } 
  
        if(this.pos.x > windowWidth - this.rad) {
          this.alive = false;
        }
        
        if(this.pos.y < this.rad) {
          this.alive = false;
        }
  
        if(this.pos.y > windowHeight - this.rad) {
          this.alive = false;
        }
      }

      
}