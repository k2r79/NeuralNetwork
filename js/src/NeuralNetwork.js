function NeuralNetwork(numberOfInputNeurons, hiddenLayerProperties, numberOfOutputNeurons, learningRate) {
    // Creating the input layer
    this.inputLayer = new Layer(numberOfInputNeurons);

    // Creating the hidden layers
    this.hiddenLayers = [];
    for (var hiddenLayerIndex = 0; hiddenLayerIndex < hiddenLayerProperties.length; hiddenLayerIndex++) {
        this.hiddenLayers.push(new Layer(hiddenLayerProperties[hiddenLayerIndex]));

        // Linking to the previous layer
        if (hiddenLayerIndex < 1) {
            // Linking to the input layer
            this.hiddenLayers[hiddenLayerIndex].linkTo(this.inputLayer);
        } else {
            // Linking to the previous hidden layer
            this.hiddenLayers[hiddenLayerIndex].linkTo(this.hiddenLayers[hiddenLayerIndex - 1]);
        }
    }

    // Creating the output layer
    this.outputLayer = new Layer(numberOfOutputNeurons);

    // Linking to the previous layer
    if (this.hiddenLayers.length > 0) {
        // Linking to the last hidden layer
        this.outputLayer.linkTo(this.hiddenLayers[this.hiddenLayers.length - 1]);
    } else {
        // Linking to the input layer if no hidden layers are declared
        this.outputLayer.linkTo(this.inputLayer);
    }

    // Setting the learning rate
    this.learningRate = learningRate;
}

NeuralNetwork.prototype.forwardPropagate = function() {
    // Cascade activate the layers starting with the output layer
    this.outputLayer.activate();
};

NeuralNetwork.prototype.learn = function(number) {
    // Iterate thru the output layer's neurons
    for (var neuronIndex = 0; neuronIndex < this.outputLayer.neurons.length; neuronIndex++) {
        var outputNeuron = this.outputLayer.neurons[neuronIndex];

        // Check if the output corresponds to the taught number
        if (neuronIndex == number) {
            outputNeuron.learn(1, this.learningRate);
        } else {
            outputNeuron.learn(0, this.learningRate);
        }
    }
};