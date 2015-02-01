describe("A neural network", function() {

    var neuralNetwork = new NeuralNetwork(3, [4], 2);

    it("can forward propagate", function() {
        // Feed input values
        neuralNetwork.inputLayer.neurons[0].output = 1;
        neuralNetwork.inputLayer.neurons[1].output = 0;
        neuralNetwork.inputLayer.neurons[2].output = 1;


    });
});