describe("A neural network", function() {

    var neuralNetwork = new NeuralNetwork(3, [4], 2, 0.05);

    it("can forward propagate", function() {
        // Feed input values
        neuralNetwork.inputLayer.neurons[0].output = 1;
        neuralNetwork.inputLayer.neurons[1].output = 0;
        neuralNetwork.inputLayer.neurons[2].output = 1;

        // Setting the hidden layers' neurons' biases
        neuralNetwork.hiddenLayers[0].neurons[0].bias = 0.23;
        neuralNetwork.hiddenLayers[0].neurons[1].bias = 0.05;
        neuralNetwork.hiddenLayers[0].neurons[2].bias = 0.74;
        neuralNetwork.hiddenLayers[0].neurons[3].bias = 0.32;

        // Setting the hidden layers' neurons' synapses' weights
        neuralNetwork.hiddenLayers[0].neurons[0].leftSynapses[0].weight = 0.45;
        neuralNetwork.hiddenLayers[0].neurons[0].leftSynapses[1].weight = 0.34;
        neuralNetwork.hiddenLayers[0].neurons[0].leftSynapses[2].weight = 0.22;

        neuralNetwork.hiddenLayers[0].neurons[1].leftSynapses[0].weight = 0.99;
        neuralNetwork.hiddenLayers[0].neurons[1].leftSynapses[1].weight = 0.67;
        neuralNetwork.hiddenLayers[0].neurons[1].leftSynapses[2].weight = 0.01;

        neuralNetwork.hiddenLayers[0].neurons[2].leftSynapses[0].weight = 0.21;
        neuralNetwork.hiddenLayers[0].neurons[2].leftSynapses[1].weight = 0.56;
        neuralNetwork.hiddenLayers[0].neurons[2].leftSynapses[2].weight = 0.67;

        neuralNetwork.hiddenLayers[0].neurons[3].leftSynapses[0].weight = 0.09;
        neuralNetwork.hiddenLayers[0].neurons[3].leftSynapses[1].weight = 0.89;
        neuralNetwork.hiddenLayers[0].neurons[3].leftSynapses[2].weight = 0.34;

        // Setting the output layers' neurons' biases
        neuralNetwork.outputLayer.neurons[0].bias = 0.64;
        neuralNetwork.outputLayer.neurons[1].bias = 0.15;

        // Setting the output layers' neurons' synapses' weights
        neuralNetwork.outputLayer.neurons[0].leftSynapses[0].weight = 0.88;
        neuralNetwork.outputLayer.neurons[0].leftSynapses[1].weight = 0.13;
        neuralNetwork.outputLayer.neurons[0].leftSynapses[2].weight = 0.99;
        neuralNetwork.outputLayer.neurons[0].leftSynapses[3].weight = 0.07;

        neuralNetwork.outputLayer.neurons[1].leftSynapses[0].weight = 0.19;
        neuralNetwork.outputLayer.neurons[1].leftSynapses[1].weight = 0.32;
        neuralNetwork.outputLayer.neurons[1].leftSynapses[2].weight = 0.31;
        neuralNetwork.outputLayer.neurons[1].leftSynapses[3].weight = 0.29;

        // Forward propagate
        neuralNetwork.forwardPropagate();

        // Check the final output
        expect(neuralNetwork.outputLayer.neurons[0].output).toEqual(0.14161325249117482);
        expect(neuralNetwork.outputLayer.neurons[1].output).toEqual(0.47253007169626);
    });

    it ("can back propagate", function() {
        // Forward propagate in the neural network
        neuralNetwork.forwardPropagate();

        // Install a spy on the neurons for learning
        spyOn(neuralNetwork.outputLayer.neurons[0], "learn");
        spyOn(neuralNetwork.outputLayer.neurons[1], "learn");

        // Learn the number 4
        neuralNetwork.learn(1);

        // Check that the learning has been initiated
        expect(neuralNetwork.outputLayer.neurons[0].learn).toHaveBeenCalledWith(0, 0.05);
        expect(neuralNetwork.outputLayer.neurons[1].learn).toHaveBeenCalledWith(1, 0.05);
    });
});