describe("A neuron", function() {

    var learningRate;
    var neuron;
    var previousNeurons;
    var nextNeurons;

    beforeEach(function() {
        // Mock the learning rate
        learningRate = 0.05;

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

        // Create the left synapses with the previous layer neurons
        var leftSynapses = [
            new Synapse(previousNeurons[0], neuron),
            new Synapse(previousNeurons[1], neuron),
            new Synapse(previousNeurons[2], neuron)
        ];

        // Setting the previous neurons' weights
        leftSynapses[0].weight = 0.53;
        leftSynapses[1].weight = 0.12;
        leftSynapses[2].weight = 0.94;

        // Installing the left synapses in the neuron
        neuron.leftSynapses = leftSynapses;

        // Installing the left synapses as the right synapses of the previous neurons
        previousNeurons[0].rightSynapses.push(leftSynapses[0]);
        previousNeurons[1].rightSynapses.push(leftSynapses[1]);
        previousNeurons[2].rightSynapses.push(leftSynapses[2]);

        // Create the next layer neurons
        nextNeurons = [
            new Neuron(),
            new Neuron()
        ];

        // Create the right synapses with the previous layer neurons
        var rightSynapses = [
            new Synapse(neuron, nextNeurons[0]),
            new Synapse(neuron, nextNeurons[1])
        ];

        // Setting the next neurons' weights
        rightSynapses[0].weight = 0.89;
        rightSynapses[1].weight = 0.72;

        // Setting the next neurons' error gradient
        //rightSynapses[0].errorGradient = -0.22;
        //rightSynapses[1].errorGradient = 0.05;

        // Installing the right synapses in the neuron
        neuron.rightSynapses = rightSynapses;

        // Installing the right synapses as the left synapses of the next neurons
        nextNeurons[0].leftSynapses.push(rightSynapses[0]);
        nextNeurons[1].leftSynapses.push(rightSynapses[1]);

        // Setting the neuron's bias
        neuron.bias = 0.10;
    });

    it("is a sigmoid function", function() {
        // Activate the neuron
        neuron.activate();

        // Check values
        expect(neuron.output).toEqual(0.5106234010049637);
    });

    it("can be an input layer neuron", function() {
        // Delete the previously set synapses
        neuron.leftSynapses = [];

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

    it("can learn as an output neuron", function() {
        var desiredValue = 1;

        // Clear the right synapses (to make it an output neuron)
        neuron.rightSynapses = [];

        // Activate the neuron
        neuron.activate();

        // Check the activation and output of the neuron
        expect(neuron.output).toEqual(0.5106234010049637);

        // Make the neuron learn
        neuron.learn(desiredValue, learningRate);

        // Check the neuron's error gradient
        expect(neuron.errorGradient).toEqual(0.12228892034574042);

        // Check the new left synapses' weights
        expect(neuron.leftSynapses[0].weight).toEqual(0.5307948779822473);
        expect(neuron.leftSynapses[1].weight).toEqual(0.1224457784069148);
        expect(neuron.leftSynapses[2].weight).toEqual(0.9414674670441489);
    });

    //it("can learn", function() {
    //    // Mock the learning rate
    //    var learningRate = 0.05;
    //
    //    // Activate the neurons
    //    nextNeurons[0].activate();
    //    nextNeurons[1].activate();
    //
    //    // Check the activation and output of the neuron
    //    expect(neuron.output).toEqual(0.5106234010049637);
    //
    //    // Make the neuron learn
    //    //neuron.learn(learningRate);
    //
    //
    //});
});