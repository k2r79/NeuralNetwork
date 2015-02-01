function Neuron() {
    this.output = null;
    this.bias = Math.random();
    this.synapses = [];
}

Neuron.prototype.activate = function() {
    // Sum(w(x) * o(x) - b)
    var z = 0;
    for (var synapseIndex = 0; synapseIndex < this.synapses.length; synapseIndex++) {
        z += this.synapses[synapseIndex].weight * this.synapses[synapseIndex].neuron.output - this.bias;
    }

    // Sigmoid function
    this.output = 1 / (1 + Math.exp(-z));
};