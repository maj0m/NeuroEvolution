class Neuron {
    constructor(inputNeurons) {
        this.inputNeurons = [];
        this.inputWeights = [];
        this.bias = 0;

        if(inputNeurons) {
            this.inputNeurons = inputNeurons;
            for(let i = 0; i < this.inputNeurons.length; i++) {
                this.inputWeights.push(random(-1, 1));
            }

            this.bias += random(-1, 1);
        }

        this.value = 0;
    }

    calculateOutput() {
        let out = 0;
        for(let i = 0; i < this.inputNeurons.length; i++) {
            out += this.inputNeurons[i].value * this.inputWeights[i];
        }

        out += this.bias;
        this.value = this.activation(out);
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

     // Maps the [0,1] Sigmoid function to [-1, 1]
     activation(x) {
        return 2 * this.sigmoid(x) - 1;
    }
}