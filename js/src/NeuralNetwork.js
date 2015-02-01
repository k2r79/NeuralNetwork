function NeuralNetwork(numberOfInputNeurons, hiddenLayerProperties, numberOfOutputNeurons) {
    // Creating the input layer
    this.inputLayer = new Layer(numberOfInputNeurons);

    // Creating the hidden layers
    this.hiddenLayers = [];
    for (var hiddenLayerIndex = 0; hiddenLayerIndex < hiddenLayerProperties; hiddenLayerIndex++) {
        this.hiddenLayers.push(hiddenLayerProperties[hiddenLayerIndex]);
    }

    // Creating the output layer
    this.ouputLayer = new Layer(numberOfOutputNeurons);
}