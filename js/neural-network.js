function NeuralNetwork(numberOfInputNeurons, numberOfOutputNeurons) {
    this.learningRate = 0.01;
    this.recognitionThreshold = 0.5;

    this.numberNeuronsPerLayer = [ numberOfInputNeurons, numberOfInputNeurons * 1.5, numberOfOutputNeurons ];

    this.weights = []; // weights[layerIndex][neuronIndex][previousNeuronIndex] = weight;
    this.outputs = []; // output[layerIndex][neuronIndex]
}

NeuralNetwork.prototype.initialize = function() {
    this.initializeWeights();
    this.initializeOutputs();
};

NeuralNetwork.prototype.initializeWeights = function() {
    for (var layerIndex = 0; layerIndex < this.numberNeuronsPerLayer.length; layerIndex++) {
        this.weights[layerIndex] = [];
        for (var neuronIndex = 0; neuronIndex < this.numberNeuronsPerLayer[layerIndex]; neuronIndex++) {
            this.weights[layerIndex][neuronIndex] = [];
            for (var previousLayerNeuronIndex = 0; previousLayerNeuronIndex < this.numberNeuronsPerLayer[layerIndex]; previousLayerNeuronIndex++) {
                this.weights[layerIndex][neuronIndex][previousLayerNeuronIndex] = 0;
            }
        }
    }
}

NeuralNetwork.prototype.initializeOutputs = function() {
    for (var layerIndex = 0; layerIndex < this.numberNeuronsPerLayer.length; layerIndex++) {
        this.outputs[layerIndex] = [];
        for (var i = 0; i < this.numberNeuronsPerLayer[layerIndex]; i++) {
            this.outputs[layerIndex][i] = 0;
        }
    }
};

NeuralNetwork.prototype.learn = function(inputs, numberToLearn) {
    var outputs = this.process(inputs);

    // Compute errors for the ouput layer
    var previousErrors = [];
    for (var neuronIndex = 0; neuronIndex < this.weights[this.weights.length - 1].length; neuronIndex++) {
        var expectedOutput = neuronIndex == numberToLearn ? 1 : 0;

        previousErrors[neuronIndex] = (expectedOutput - outputs[outputs.length - 1][neuronIndex]) * (outputs[outputs.length - 1][neuronIndex] * (1 - outputs[outputs.length - 1][neuronIndex]));
    }

    // Backpropagation
    for (var layerIndex = this.numberNeuronsPerLayer.length - 2; layerIndex >= 0; layerIndex--) {
        var errors = [];
        for (neuronIndex = 0; neuronIndex < this.numberNeuronsPerLayer[layerIndex].length; neuronIndex++) {
            var error = 0;
            for (var nextLayerNeuronIndex = 0; nextLayerNeuronIndex < this.weights[layerIndex + 1][neuronIndex].length; nextLayerNeuronIndex++) {
                error += this.weights[layerIndex + 1][neuronIndex][nextLayerNeuronIndex] * previousErrors[nextLayerNeuronIndex];
            }

            errors[neuronIndex] = error * (outputs[layerIndex][neuronIndex] * (1 - outputs[layerIndex][neuronIndex]));

            var derivative = 0;
            for (var previousLayerNeuronIndex = 0; previousLayerNeuronIndex < this.weights[layerIndex][neuronIndex].length; previousLayerNeuronIndex++) {
                derivative += errors[neuronIndex] * outputs[previousLayerNeuronIndex];
            }

            for (previousLayerNeuronIndex = 0; previousLayerNeuronIndex < this.weights[layerIndex][neuronIndex].length; previousLayerNeuronIndex++) {
                this.weights[layerIndex][neuronIndex][previousLayerNeuronIndex] += + (derivative * this.learningRate);
            }
        }

        previousErrors = errors;
    }
};

NeuralNetwork.prototype.process = function(inputs) {
    this.initializeOutputs();

    // Compute input layer's outputs
    for (var inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
        this.outputs[0][inputIndex] = inputs[inputIndex];
    }

    // Compute the next layers' outputs
    for (var layerIndex = 1; layerIndex < this.numberNeuronsPerLayer.length; layerIndex++) {
        for (var neuronIndex = 0; neuronIndex < this.numberNeuronsPerLayer[layerIndex].length; neuronIndex++) {
            var input = 0;
            for (var previousLayerNeuronIndex = 0; previousLayerNeuronIndex < this.weights[layerIndex][neuronIndex].length; previousLayerNeuronIndex++) {
                input += this.weights[layerIndex][neuronIndex][previousLayerNeuronIndex] * this.outputs[layerIndex - 1][previousLayerNeuronIndex];
            }

            this.outputs[layerIndex][neuronIndex] = 1 / (1 + Math.exp(-input));
        }
    }

    return this.outputs;
};

NeuralNetwork.prototype.recognizeNumber = function(inputs) {
    var outputs = this.process(inputs);
    outputs = outputs[outputs.length - 1];

    // Get the recognized numbers
    var recognizedNumbers = [];
    for (var number = 0; number < outputs.length; number++) {
        if (outputs[number] > this.recognitionThreshold) {
            recognizedNumbers.push(number.toString());
        }
    }

    return recognizedNumbers;
};

NeuralNetwork.prototype.displayWeights = function() {
    console.log(this.weights);
};