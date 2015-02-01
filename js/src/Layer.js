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

            // Create the new synapse
            var synapse = new Synapse(previousNeuron, neuron);

            // Assign the synapse to both neurons
            neuron.leftSynapses.push(synapse);
            previousNeuron.rightSynapses.push(synapse);
        }
    }
};

Layer.prototype.activate = function() {
    // Iterate thru the layer's neurons
    for (var neuronIndex = 0; neuronIndex < this.neurons.length; neuronIndex++) {
        // Compute the current neuron's output
        this.neurons[neuronIndex].activate();
    }
};