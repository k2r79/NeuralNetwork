describe("A layer", function() {

    var layer;

    it("is linked to previous layer", function() {
        // Creating the previous layer
        var previousLayer = new Layer(3);

        // Creating and linking the current layer
        layer = new Layer(4);
        layer.linkTo(previousLayer);

        // Check the link
        for (var neuronIndex = 0; neuronIndex < layer.neurons.length; neuronIndex++) {
            var neuron = layer.neurons[neuronIndex];

            // Check the number of links
            expect(neuron.synapses.length).toEqual(previousLayer.neurons.length);

            // Check the synapses' neurons against the previous layer's neurons
            for (var previousNeuronIndex = 0; previousNeuronIndex < previousLayer.neurons.length; previousNeuronIndex++) {
                expect(neuron.synapses[previousNeuronIndex].neuron).toEqual(previousLayer.neurons[previousNeuronIndex]);
            }
        }
    });
});