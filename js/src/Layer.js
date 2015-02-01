function Layer(numberOfNeurons) {
    // Populate the neuron list
    this.neurons = [];
    for (var neuronIndex = 0; neuronIndex < numberOfNeurons; neuronIndex++) {
        this.neurons.push(new Neuron());
    }
}

Layer.prototype.linkTo = function(layer) {
    // Iterate thru the previous layer's neurons
    for (var previousNeuronIndex = 0; previousNeuronIndex < layer.neurons.length; previousNeuronIndex++) {
        var previousNeuron = layer.neurons[previousNeuronIndex];

        // Iterate thru the current layer's neurons
        for (var neuronIndex = 0; neuronIndex < this.neurons.length; neuronIndex++) {
            var neuron = this.neurons[neuronIndex];

            neuron.synapses.push(new Synapse(previousNeuron));
        }
    }
};