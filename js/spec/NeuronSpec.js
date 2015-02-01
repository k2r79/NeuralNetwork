describe("A neuron", function() {

    var neuron;
    var previousNeurons;

    beforeEach(function() {
        // Create a new neuron
        neuron = new Neuron();

        // Create the previous layer neurons
        previousNeurons = [
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
    });

    it("is a sigmoid function", function() {
        // Activate neuron
        neuron.activate();

        // Check values
        expect(neuron.output).toEqual(0.5106234010049637);
    });

    it("can be an input layer neuron", function() {
        // Delete the previously set synapses
        neuron.synapses = [];

        // Force the neuron's output
        neuron.output = 1;

        // Activate the neuron
        neuron.activate();

        // Check the forced value is used
        expect(neuron.output).toEqual(1);
    });

    it("activates it's previous neurons", function() {
        // Install spies on the previous neurons
        spyOn(previousNeurons[0], 'activate');
        spyOn(previousNeurons[1], 'activate');
        spyOn(previousNeurons[2], 'activate');

        // Activate neuron
        neuron.activate();

        // Check the previous neurons are activated
        expect(previousNeurons[0].activate).toHaveBeenCalled();
        expect(previousNeurons[1].activate).toHaveBeenCalled();
        expect(previousNeurons[2].activate).toHaveBeenCalled();
    });
});