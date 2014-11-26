function NeuralNetwork(numberOfInputNeurons, numberOfOutputNeurons) {
    this.learningRate = 0.1;
    this.recognitionThreshold = 0.5;

    this.numberNeuronsPerLayer = [ numberOfInputNeurons, numberOfInputNeurons * 1.5, numberOfOutputNeurons ];

    this.weights = []; // weights[layerIndex][neuronIndex][previousNeuronIndex] = weight;
    this.output = [];
}

NeuralNetwork.prototype.initialize = function() {
    for (var layerIndex = 1; layerIndex < this.numberNeuronsPerLayer.length; layerIndex++) {
        this.weights[layerIndex] = [];
        for (var neuronIndex = 0; neuronIndex < this.numberNeuronsPerLayer[layerIndex]; neuronIndex++) {
            for (var previousLayerNeuronIndex = 0; previousLayerNeuronIndex < this.numberNeuronsPerLayer[layerIndex]; previousLayerNeuronIndex++) {
                this.weights[layerIndex][neuronIndex][previousLayerNeuronIndex] = 0;
            }
        }
    }

    this.initializeOutputs();
};

NeuralNetwork.prototype.initializeOutputs = function() {
    for (var i = 0; i < this.numberNeuronsPerLayer[this.numberNeuronsPerLayer.length - 1]; i++) {
        this.output[i] = 0;
    }
};

NeuralNetwork.prototype.learn = function(input, number) {
    /**
     * P = P + t * (A - O) * E
     *
     * P = Poids de la connexion
     * t = Taux d'apprentissage
     * A = Sortie attendue
     * O = Sortie obtenue
     * E = Entrée
     */

    this.process(input);

    for (var y = 0; y < this.network.length; y++) {
        for (var x = 0; x < this.network[y].length; x++) {
            if (this.network[y][x] != -1) {

                var expectedValue = 0;
                if (x == number) {
                    expectedValue = 1;
                }

                var neuronActivation = this.output[x] > this.activationValue ? 1 : 0;

                this.network[y][x] = this.network[y][x] + this.learningRate * (expectedValue - neuronActivation) * input[y];
            }
        }
    }
};

NeuralNetwork.prototype.process = function(inputs) {
    this.initializeOutputs();

    // Compute input layer's outputs
    var outputs = [];
    for (var inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
        outputs[inputIndex] = inputs[inputIndex];
    }

    // Compute the next layers' outputs
    for (var layerIndex = 1; layerIndex < this.numberNeuronsPerLayer.length; layerIndex++) {
        for (var neuronIndex = 0; neuronIndex < this.numberNeuronsPerLayer[layerIndex].length; neuronIndex++) {
            var input = 0;
            for (var previousLayerNeuronIndex = 0; previousLayerNeuronIndex < this.weights[layerIndex][neuronIndex].length; previousLayerNeuronIndex++) {
                input += this.weights[layerIndex][neuronIndex][previousLayerNeuronIndex] * outputs[previousLayerNeuronIndex];
            }

            outputs[neuronIndex] = 1 / (1 + Math.exp(input));
        }
    }

    // Get the recognized numbers
    var recognizedNumbers = [];
    for (var number = 0; number < outputs.length; number++) {
        if (outputs[number] > this.recognitionThreshold) {
            recognizedNumbers.push(number.toString());
        }
    }

    return recognizedNumbers;
};

NeuralNetwork.prototype.displayNetwork = function() {
    var networkString = "";
    for (var y = 0; y < this.network.length; y++) {
        for (var x = 0; x < this.network[y].length; x++) {
            networkString += this.network[y][x] + " ";
        }

        networkString += "\n";
    }

    console.log(networkString);
};