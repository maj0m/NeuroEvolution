Neural Network training with Genetic Algorithms

I chose a simple Flappy Bird-like environment for this showcase.

200 Agents spawn in each generation, and the 5 Agents with the best score get to reproduce to make the next generation.
The DNA of the Agents are the weights and biases of their neural network.
With each new generation, the new Agents get their DNA from two randomly picked parents from the pool of the fittest of the previous generation.
A cutoff point is randomly picked for each layer of the parent's NN, allowing for the child to inherit varying proportion of genes from each parent.
The children's genes have a low chance of mutating, enabling the population to adapt to their environment.

No Neural Network / AI libraries were used for this project. I made the NN on my own, so flaws are to be expected.
I used the p5.js library for visualization.
