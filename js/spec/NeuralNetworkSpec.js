describe("A neural network", function() {

    var neuralNetwork = new NeuralNetwork(3, [4], 2);

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
        neuralNetwork.hiddenLayers[0].neurons[0].synapses[0].weight = 0.45;
        neuralNetwork.hiddenLayers[0].neurons[0].synapses[1].weight = 0.34;
        neuralNetwork.hiddenLayers[0].neurons[0].synapses[2].weight = 0.22;

        neuralNetwork.hiddenLayers[0].neurons[1].synapses[0].weight = 0.99;
        neuralNetwork.hiddenLayers[0].neurons[1].synapses[1].weight = 0.67;
        neuralNetwork.hiddenLayers[0].neurons[1].synapses[2].weight = 0.01;

        neuralNetwork.hiddenLayers[0].neurons[2].synapses[0].weight = 0.21;
        neuralNetwork.hiddenLayers[0].neurons[2].synapses[1].weight = 0.56;
        neuralNetwork.hiddenLayers[0].neurons[2].synapses[2].weight = 0.67;

        neuralNetwork.hiddenLayers[0].neurons[3].synapses[0].weight = 0.09;
        neuralNetwork.hiddenLayers[0].neurons[3].synapses[1].weight = 0.89;
        neuralNetwork.hiddenLayers[0].neurons[3].synapses[2].weight = 0.34;

        // Setting the output layers' neurons' biases
        neuralNetwork.outputLayer.neurons[0].bias = 0.64;
        neuralNetwork.outputLayer.neurons[1].bias = 0.15;

        // Setting the output layers' neurons' synapses' weights
        neuralNetwork.outputLayer.neurons[0].synapses[0].weight = 0.88;
        neuralNetwork.outputLayer.neurons[0].synapses[1].weight = 0.13;
        neuralNetwork.outputLayer.neurons[0].synapses[2].weight = 0.99;
        neuralNetwork.outputLayer.neurons[0].synapses[3].weight = 0.07;

        neuralNetwork.outputLayer.neurons[1].synapses[0].weight = 0.19;
        neuralNetwork.outputLayer.neurons[1].synapses[1].weight = 0.32;
        neuralNetwork.outputLayer.neurons[1].synapses[2].weight = 0.31;
        neuralNetwork.outputLayer.neurons[1].synapses[3].weight = 0.29;

        // Forward propagate
        neuralNetwork.forwardPropagate();

        // Check the final output
        expect(neuralNetwork.outputLayer.neurons[0].output).toEqual();
        expect(neuralNetwork.outputLayer.neurons[1].output).toEqual();
    });
});