class Brain {
    constructor(inputCount, hiddenCount, outputCount) {
        this.Layer1 = [];
        this.Layer2 = [];
        this.Layer3 = [];

        for(let i = 0; i < inputCount; i++) {
            let n = new Neuron(null);
            this.Layer1.push(n);
        }

        for(let i = 0; i < hiddenCount; i++) {
            let n = new Neuron(this.Layer1);
            this.Layer2.push(n);
        }

        for(let i = 0; i < outputCount; i++) {
            let n = new Neuron(this.Layer2);
            this.Layer3.push(n);
        }
    }

    draw(x, y) {
        for(let i = 0; i < this.Layer1.length; i++) {
            push();
            circle(x, y + 80 + i * 100, this.Layer1[i].value*50);
            pop();
        }

        for(let i = 0; i < this.Layer2.length; i++) { 
            for(let j = 0; j < this.Layer1.length; j++) {
                push();
                strokeWeight(this.Layer2[i].inputWeights[j]*5);
                line(x + 120, y + i * 30, x, y + 80 + j * 100);
                pop();
            }

            circle(x + 120, y + i * 30, this.Layer2[i].value*50);
        }

        for(let i = 0; i < this.Layer3.length; i++) {
            for(let j = 0; j < this.Layer2.length; j++) {
                push();
                strokeWeight(this.Layer3[i].inputWeights[j]*5);
                line(x + 240, y + 120 + i * 100, x + 120, y + j * 30);
                pop();
            }

            circle(x + 240, y + 120 + i * 100, this.Layer3[i].value*50);
        }
    }
    

    guess(x, y, z) {
        this.Layer1[0].value = x;
        this.Layer1[1].value = y;
        this.Layer1[2].value = z;

        for(let i = 0; i < this.Layer2.length; i++) {
            this.Layer2[i].calculateOutput();
        }

        for(let i = 0; i < this.Layer3.length; i++) {
            this.Layer3[i].calculateOutput();
        }

        return this.activation(this.Layer3[0].value);
    }

    mutate(chance) {
        // Mutate Layer 2
        for(let i = 0; i < this.Layer2.length; i++) {
            // Mutate weights
            for(let j = 0; j < this.Layer2[i].inputWeights.length; j++) {
                if(random(0, 1) < chance) {
                    this.Layer2[i].inputWeights[j] = random(-1, 1);
                }
            }
            // Mutate bias
            if(random(0, 1) < chance) {
                this.Layer2[i].bias = random(-1, 1);
            }
        }

        //Mutate Layer 3
        for(let i = 0; i < this.Layer3.length; i++) {
            // Mutate weights
            for(let j = 0; j < this.Layer3[i].inputWeights.length; j++) {
                if(random(0, 1) < chance) {
                    this.Layer3[i].inputWeights[j] = random(-1, 1);
                }
            }

            //Mutate bias
            if(random(0, 1) < chance*2) {
                this.Layer2[i].bias = random(-1, 1);
            }
        }
    }

    crossOver(partner) {
        let childBrain = new Brain(this.Layer1.length, this.Layer2.length, this.Layer3.length);

        let cutoffL2 = floor(random(0, this.Layer2.length));
        for(let i = 0; i < this.Layer2.length; i++) {
            if(i < cutoffL2) {
                childBrain.Layer2[i].inputWeights = this.Layer2[i].inputWeights; 
            } else {
                childBrain.Layer2[i].inputWeights = partner.Layer2[i].inputWeights;
            }
        }

        let cutoffL3 = floor(random(0, this.Layer3.length));
        for(let i = 0; i < this.Layer3.length; i++) {
            if(i < cutoffL3) {
                childBrain.Layer3[i].inputWeights = this.Layer3[i].inputWeights; 
            } else {
                childBrain.Layer3[i].inputWeights = partner.Layer3[i].inputWeights;
            }
        }

        return childBrain;
    }

    activation(value) {
        if(value < 0) {
            return 0;
        } else {
            return 1;
        }
    }

}