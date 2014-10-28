function Perceptron() {
    this.learningRate = 0.1;
    this.activationValue = 1;

    this.network = [];
    this.output = [];
}

Perceptron.prototype.initialize = function(numberOfInputNeurons, numberOfOutputNeurons) {
    for (var y = 0; y < numberOfInputNeurons; y++) {
        this.network[y] = [];
        for (var x = 0; x < numberOfOutputNeurons; x++) {
            this.network[y][x] = 0;
        }
    }

    this.initializeOutputs(numberOfOutputNeurons);
};

Perceptron.prototype.initializeOutputs = function(numberOfOutputNeurons) {
    for (var i = 0; i < numberOfOutputNeurons; i++) {
        this.output[i] = 0;
    }
};

Perceptron.prototype.learn = function(input, number) {
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

Perceptron.prototype.process = function(input) {
    this.initializeOutputs(this.network[0].length);

    for (var y = 0; y < this.network.length; y++) {
        for (var x = 0; x < this.network[y].length; x++) {
            if (this.network[y][x] != -1) {
                this.output[x] += this.network[y][x] * input[y];
            }
        }
    }

    var recognizedNumbers = [];

    for (var number = 0; number < this.network[0].length; number++) {
        if (this.output[number] > this.activationValue) {
            recognizedNumbers.push(number.toString());
        }
    }

    console.log(this.output);

    return recognizedNumbers;
};

Perceptron.prototype.displayNetwork = function() {
    var networkString = "";
    for (var y = 0; y < this.network.length; y++) {
        for (var x = 0; x < this.network[y].length; x++) {
            networkString += this.network[y][x] + " ";
        }

        networkString += "\n";
    }

    console.log(networkString);
};