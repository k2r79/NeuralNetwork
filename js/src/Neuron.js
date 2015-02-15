function Neuron() {
    this.output = null;
    this.threshold = Math.random();
    this.leftSynapses = [];
    this.rightSynapses = [];
    this.errorGradient = null;
}

Neuron.prototype.activate = function() {
    // If the neuron has no left synapses, it's an input neuron
    if (this.leftSynapses.length < 1) {
        return;
    }

    // Sigmoid function
    var activation = 0;
    for (var synapseIndex = 0; synapseIndex < this.leftSynapses.length; synapseIndex++) {
        // Activate the previous neuron
        this.leftSynapses[synapseIndex].leftNeuron.activate();

        // Sum(w(x) * o(x) - b)
        activation += this.leftSynapses[synapseIndex].weight * this.leftSynapses[synapseIndex].leftNeuron.output;
    }

    // Sigmoid function
    this.output = 1 / (1 + Math.exp(-(activation - this.threshold)));
};

Neuron.prototype.computeErrorGradient = function(desiredValue, learningRate) {
    // Compute the neuron's error gradient
    this.errorGradient = this.output * (1 - this.output);

    if (desiredValue != null) {
        // For an output neuron
        this.errorGradient *= (desiredValue - this.output);
    } else if (this.leftSynapses.length > 0) {
        // For a hidden neuron
        var errorGradientSum = 0;
        for (var rightSynapseIndex = 0; rightSynapseIndex < this.rightSynapses.length; rightSynapseIndex++) {
            var rightSynapse = this.rightSynapses[rightSynapseIndex];

            errorGradientSum += rightSynapse.weight * rightSynapse.rightNeuron.errorGradient;
        }

        this.errorGradient *= errorGradientSum;
    } else {
        // For an input neuron (exit)
        return;
    }

    // Iterate thru the previous neurons
    for (var synapseIndex = 0; synapseIndex < this.leftSynapses.length; synapseIndex++) {
        var leftSynapse = this.leftSynapses[synapseIndex];

        // Make the previous neuron compute it's error gradient
        leftSynapse.leftNeuron.computeErrorGradient(null, learningRate);
    }
};

Neuron.prototype.updateWeights = function(desiredValue, learningRate) {
    // Iterate thru the previous neurons
    for (var synapseIndex = 0; synapseIndex < this.leftSynapses.length; synapseIndex++) {
        var leftSynapse = this.leftSynapses[synapseIndex];

        // Adjust the left synapses' weights
        leftSynapse.weight += learningRate * leftSynapse.leftNeuron.output * this.errorGradient;

        // Order previous neuron to learn
        leftSynapse.leftNeuron.updateWeights(null, learningRate);
    }
};