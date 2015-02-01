function NeuralNetwork(numberOfInputNeurons, hiddenLayerProperties, numberOfOutputNeurons) {
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
}

NeuralNetwork.prototype.forwardPropagate = function() {
    // Cascade activate the layers starting with the output layer
    this.outputLayer.activate();
};