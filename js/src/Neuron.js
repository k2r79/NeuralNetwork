function Neuron() {
    this.output = null;
    this.bias = Math.random();
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
    var z = 0;
    for (var synapseIndex = 0; synapseIndex < this.leftSynapses.length; synapseIndex++) {
        // Activate the previous neuron
        this.leftSynapses[synapseIndex].leftNeuron.activate();

        // Sum(w(x) * o(x) - b)
        z += this.leftSynapses[synapseIndex].weight * this.leftSynapses[synapseIndex].leftNeuron.output - this.bias;
    }

    // Sigmoid function
    this.output = 1 / (1 + Math.exp(-z));
};

Neuron.prototype.learn = function(desiredValue, learningRate) {
    // Compute the neuron's error gradient
    this.errorGradient = this.output * (1 - this.output) * (desiredValue - this.output);

    // Adjust the left synapses' weights
    for (var synapseIndex = 0; synapseIndex < this.leftSynapses.length; synapseIndex++) {
        var leftSynapse = this.leftSynapses[synapseIndex];

        leftSynapse.weight += learningRate * leftSynapse.leftNeuron.output * this.errorGradient;
    }
};