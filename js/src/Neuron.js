function Neuron() {
    this.output = null;
    this.bias = Math.random();
    this.synapses = [];
}

Neuron.prototype.activate = function() {
    // If the neuron has no synapses, return the ouput value
    if (this.synapses.length < 1) {
        return this.output;
    }

    // Sigmoid function
    var z = 0;
    for (var synapseIndex = 0; synapseIndex < this.synapses.length; synapseIndex++) {
        // Activate the previous neuron
        this.synapses[synapseIndex].neuron.activate();

        // Sum(w(x) * o(x) - b)
        z += this.synapses[synapseIndex].weight * this.synapses[synapseIndex].neuron.output - this.bias;
    }

    // Sigmoid function
    this.output = 1 / (1 + Math.exp(-z));
};