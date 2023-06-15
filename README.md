Neural Network training with Genetic Algorithms

I chose a simple Flappy Bird-like environment for this showcase.

200 Agents spawn in each generation, and the 5 Agents with the best score get to reproduce to make the next generation.
The DNA of the Agents are the weights and biases of their neural network.
With each new generation, the new Agents get their DNA from two randomly picked parents from the pool of the fittest of the previous generation.
A cutoff point is randomly picked for each layer of the parent's NN, allowing for the child to inherit varying proportion of genes from each parent.
The children's genes have a low chance of mutating, enabling the population to adapt to their environment.

No Neural Network / AI libraries were used for this project. I made the NN on my own, so flaws are to be expected.
I used the p5.js library for visualization.

Demo: https://maj0m.github.io/Neuroevolution/

Inputs for the neural network: 
  1) Agent's Y coordinate
  2) Next obstacle's X coordinate
  3) Next obstacle's Y coordinate

Output: Jump / Do nothing

Network Depth: 2 ( [3, 12, 1] )
  This is obviously an overkill, since the task at hand is so simple that hidden layers are not even neccessarily needed.
  Yet I decided to keep this structure because this is a demo and it looks cooler and gives more "personality" to the agents.
  
Question: Why does the first generation often produce agents that can go indefinitely? Are they pre-trained? What's going on?
Answer:   Since the task is relatively simple, it is pretty likely, that out of the 200 randomly initialized networks will emerge a lucky few, that
          have it figured out out-of-the-box.
          
There are plenty of room for improvement, but I do not intend on continuing on this project, as I consider it my Hello World in ML.
Next up: NEAT 


