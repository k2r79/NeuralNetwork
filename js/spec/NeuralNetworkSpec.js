describe("A neural network", function() {

    var neuralNetwork;

    beforeEach(function() {
        neuralNetwork = new NeuralNetwork(3, [4], 2, 0.05);

        // Feed input values
        neuralNetwork.inputLayer.neurons[0].output = 1;
        neuralNetwork.inputLayer.neurons[1].output = 0;
        neuralNetwork.inputLayer.neurons[2].output = 1;

        // Setting the hidden layers' neurons' biases
        neuralNetwork.hiddenLayers[0].neurons[0].threshold = 0.23;
        neuralNetwork.hiddenLayers[0].neurons[1].threshold = 0.05;
        neuralNetwork.hiddenLayers[0].neurons[2].threshold = 0.74;
        neuralNetwork.hiddenLayers[0].neurons[3].threshold = 0.32;

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
        neuralNetwork.outputLayer.neurons[0].threshold = 0.64;
        neuralNetwork.outputLayer.neurons[1].threshold = 0.15;

        // Setting the output layers' neurons' synapses' weights
        neuralNetwork.outputLayer.neurons[0].leftSynapses[0].weight = 0.88;
        neuralNetwork.outputLayer.neurons[0].leftSynapses[1].weight = 0.13;
        neuralNetwork.outputLayer.neurons[0].leftSynapses[2].weight = 0.99;
        neuralNetwork.outputLayer.neurons[0].leftSynapses[3].weight = 0.07;

        neuralNetwork.outputLayer.neurons[1].leftSynapses[0].weight = 0.19;
        neuralNetwork.outputLayer.neurons[1].leftSynapses[1].weight = 0.32;
        neuralNetwork.outputLayer.neurons[1].leftSynapses[2].weight = 0.31;
        neuralNetwork.outputLayer.neurons[1].leftSynapses[3].weight = 0.29;
    });

    it("can forward propagate", function() {
        // Forward propagate
        neuralNetwork.forwardPropagate();

        // Check the hidden layer
        expect(neuralNetwork.hiddenLayers[0].neurons[0].output).toEqual(0.7109495026250039);
        expect(neuralNetwork.hiddenLayers[0].neurons[1].output).toEqual(0.7407748991821539);
        expect(neuralNetwork.hiddenLayers[0].neurons[2].output).toEqual(0.8347951298093854);
        expect(neuralNetwork.hiddenLayers[0].neurons[3].output).toEqual(0.679178699175393);

        // Check the final output
        expect(neuralNetwork.outputLayer.neurons[0].output).toEqual(0.9034296065352526);
        expect(neuralNetwork.outputLayer.neurons[1].output).toEqual(0.7266867013739429);
    });

    it("can back propagate", function() {
        // Forward propagate in the neural network
        neuralNetwork.forwardPropagate();

        // Install a spy on the neurons for computing the error gradient
        spyOn(neuralNetwork.outputLayer.neurons[0], "computeErrorGradient");
        spyOn(neuralNetwork.outputLayer.neurons[1], "computeErrorGradient");

        // Install a spy on the neurons for updating the weights
        spyOn(neuralNetwork.outputLayer.neurons[0], "updateWeightsAndThresholds");
        spyOn(neuralNetwork.outputLayer.neurons[1], "updateWeightsAndThresholds");

        // Learn the number 1
        neuralNetwork.learn(1);

        // Check that the learning iterations are incremented
        expect(neuralNetwork.learningIterations).toEqual(1);

        // Check that the learning has been initiated
        expect(neuralNetwork.outputLayer.neurons[0].computeErrorGradient).toHaveBeenCalledWith(0, 0.05);
        expect(neuralNetwork.outputLayer.neurons[1].computeErrorGradient).toHaveBeenCalledWith(1, 0.05);

        expect(neuralNetwork.outputLayer.neurons[0].updateWeightsAndThresholds).toHaveBeenCalledWith(0, 0.05);
        expect(neuralNetwork.outputLayer.neurons[1].updateWeightsAndThresholds).toHaveBeenCalledWith(1, 0.05);
    });

    it("can compute the mean squared error", function() {
        // Forward propagate in the neural network
        neuralNetwork.forwardPropagate();

        // Learn the number 1
        neuralNetwork.learn(1);

        // Check the mean squared error value
        expect(neuralNetwork.meanSquarredError).toEqual(0.44544260658514884);
    });
});