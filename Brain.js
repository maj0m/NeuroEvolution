const neuronSize = 32;
const weightSize = 4;
const neuronDist = 24;
const layerDist = 180;



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

    colorizeValue(value) {
        return [120 + 120 * value, 120, 120 - 120 * value];
    }

    // (X, Y): Center of the first Layer
    draw(x, y) {
        push();
        strokeWeight(5);
        fill(100, 100, 100, 200);
        rect(x - 2*neuronSize,
            y - this.Layer2.length/2 * neuronDist - neuronSize,
            2 * layerDist + 4 * neuronSize,
            this.Layer2.length * neuronDist + 2 * neuronSize
        );
        pop();

        for(let i = 0; i < this.Layer1.length; i++) {
            push();
            fill(this.colorizeValue(this.Layer1[i].value));
            if(i % 2 == 0) {
                circle(x, y - i/2 * neuronDist, neuronSize*this.Layer1[i].value);
                //text(this.Layer1[i].value, x, y - i/2 * neuronDist);
            } else {
                circle(x, y + (floor(i/2) + 1) * neuronDist, neuronSize*this.Layer1[i].value);
                //text(this.Layer1[i].value, x, y + (floor(i/2) + 1) * neuronDist);
            }
            
            pop();
        }

        for(let i = 0; i < this.Layer2.length; i++) { 
            for(let j = 0; j < this.Layer1.length; j++) {
                push();
                stroke(this.colorizeValue(this.Layer2[i].inputWeights[j]));
                strokeWeight(this.Layer2[i].inputWeights[j]*weightSize);

                if(i % 2 == 0) {
                    if(j % 2 == 0) {
                        line(x, y - j/2 * neuronDist, x + layerDist, y - i/2 * neuronDist);
                    } else {
                        line(x, y + (floor(j/2) + 1) * neuronDist, x + layerDist, y - i/2 * neuronDist);
                    }
                } else {
                    if(j % 2 == 0) {
                        line(x, y - j/2 * neuronDist, x + layerDist, y + (floor(i/2) + 1) * neuronDist);
                    } else {
                        line(x, y + (floor(j/2) + 1) * neuronDist, x + layerDist, y + (floor(i/2) + 1) * neuronDist);
                    }
                }
                pop();
            }
            
            push();
            fill(this.colorizeValue(this.Layer2[i].value));
            if(i % 2 == 0) {
                circle(x + layerDist, y - i/2 * neuronDist, neuronSize*this.Layer2[i].value);
                //text(this.Layer2[i].value, x + layerDist, y - i/2 * neuronDist);
            } else {
                circle(x + layerDist, y + (floor(i/2) + 1) * neuronDist, neuronSize*this.Layer2[i].value);
                //text(this.Layer2[i].value, x + layerDist, y + (floor(i/2) + 1) * neuronDist);
            }
            pop();
        }

        
        for(let i = 0; i < this.Layer3.length; i++) {
            for(let j = 0; j < this.Layer2.length; j++) {
                push();
                stroke(this.colorizeValue(this.Layer3[i].inputWeights[j]));
                strokeWeight(this.Layer3[i].inputWeights[j]*weightSize);

                if(i % 2 == 0) {
                    if(j % 2 == 0) {   
                        line(x + layerDist, y - j/2 * neuronDist, x + 2 * layerDist, y - i/2 * neuronDist);
                    } else {
                        line(x + layerDist, y + (floor(j/2) + 1) * neuronDist, x + 2 * layerDist, y - i/2 * neuronDist);
                    }
                } else {
                    if(j % 2 == 0) {
                        line(x + layerDist, y - j/2 * neuronDist, x + 2 * layerDist, y + (floor(i/2) + 1) * neuronDist);
                    } else {
                        line(x + layerDist, y + (floor(j/2) + 1) * neuronDist, x + 2 * layerDist, y + (floor(i/2) + 1) * neuronDist);
                    }
                }
                pop();
            }

            push();
            fill(this.colorizeValue(this.Layer3[i].value));
            if(i % 2 == 0) {
                circle(x + 2 * layerDist, y - i/2 * neuronDist, neuronSize*this.Layer3[i].value);
                //text(this.Layer3[i].value, x + 2 * layerDist+32, y - i/2 * neuronDist);
            } else {
                circle(x + 2 * layerDist, y + (floor(i/2) + 1) * neuronDist, neuronSize*this.Layer3[i].value);
                //text(this.Layer3[i].value, x + 2 * layerDist, y + (floor(i/2) + 1) * neuronDist);
            }
            pop();
        }
    }
    
    guess(inputs) {
        for(let i = 0; i < inputs.length; i++) {
            this.Layer1[i].value = inputs[i];
        }

        for(let i = 0; i < this.Layer2.length; i++) {
            this.Layer2[i].calculateOutput();
        }

        for(let i = 0; i < this.Layer3.length; i++) {
            this.Layer3[i].calculateOutput();
        }

        // Assumes that there is only 1 output Neuron
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
                this.Layer3[i].bias = random(-1, 1);
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