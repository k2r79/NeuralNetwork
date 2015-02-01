function Neuron() {
    this.output = null;
    this.bias = Math.random();
    this.leftSynapses = [];
    this.rightSynapses = [];
}

Neuron.prototype.activate = function() {
    // If the neuron has no synapses, return the ouput value
    if (this.leftSynapses.length < 1) {
        return this.output;
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