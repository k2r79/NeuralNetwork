describe("A neuron", function() {

    var neuron = new Neuron();

    it("is a sigmoid function", function() {
        // Create the previous layer neurons
        var previousNeurons = [
            new Neuron(),
            new Neuron(),
            new Neuron()
        ];

        // Setting the previous neuron's output
        previousNeurons[0].output = 0.13;
        previousNeurons[1].output = 0.40;
        previousNeurons[2].output = 0.24;

        // Create the synapses with the previous layer neurons
        var synapses = [
            new Synapse(previousNeurons[0]),
            new Synapse(previousNeurons[1]),
            new Synapse(previousNeurons[2])
        ];

        // Setting the previous neurons' weights
        synapses[0].weight = 0.53;
        synapses[1].weight = 0.12;
        synapses[2].weight = 0.94;

        // Installing the synapses in the neuron
        neuron.synapses = synapses;

        // Setting the neuron's bias
        neuron.bias = 0.10;

        // Activate neuron
        neuron.activate();

        // Check values
        expect(neuron.output).toEqual(0.5106234010049637);
    });
});