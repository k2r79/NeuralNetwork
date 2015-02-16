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

        // Setting the next neurons' biases
        nextNeurons[0].threshold = 0.2567433442454785;
        nextNeurons[1].threshold = 0.894932294730097;

        // Create the right synapses with the previous layer neurons
        var rightSynapses = [
            new Synapse(neuron, nextNeurons[0]),
            new Synapse(neuron, nextNeurons[1])
        ];

        // Setting the next neurons' weights
        rightSynapses[0].weight = 0.89;
        rightSynapses[1].weight = 0.72;

        // Installing the right synapses in the neuron
        neuron.rightSynapses = rightSynapses;

        // Installing the right synapses as the left synapses of the next neurons
        nextNeurons[0].leftSynapses.push(rightSynapses[0]);
        nextNeurons[1].leftSynapses.push(rightSynapses[1]);

        // Setting the neuron's threshold
        neuron.threshold = 0.10;
    });

    it("is a sigmoid function", function() {
        // Activate the neuron
        neuron.activate();

        // Check values
        expect(neuron.output).toEqual(0.6088545692109504);
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

    it("can compute it's error gradient as an output neuron", function() {
        var desiredValue = 1;

        // Clear the right synapses (to make it an output neuron)
        neuron.rightSynapses = [];

        // Activate the neuron
        neuron.activate();

        // Make the neuron compute it's error gradient
        neuron.computeErrorGradient(desiredValue, learningRate);

        // Check the neuron's error gradient
        expect(neuron.errorGradient).toEqual(0.09315155140160905);
    });

    it("can learn as an output neuron", function() {
        var desiredValue = 1;

        // Clear the right synapses (to make it an output neuron)
        neuron.rightSynapses = [];

        // Activate the neuron
        neuron.activate();

        // Make the neuron compute it's error gradient
        neuron.computeErrorGradient(desiredValue, learningRate);

        // Make the neuron update it's left synapse's weights
        neuron.updateWeights(desiredValue, learningRate);

        // Check the new left synapses' weights
        expect(neuron.leftSynapses[0].weight).toEqual(0.5306054850841105);
        expect(neuron.leftSynapses[1].weight).toEqual(0.12186303102803217);
        expect(neuron.leftSynapses[2].weight).toEqual(0.9411178186168192);
    });


    it("can backpropagate it's error gradient computation", function() {
        // Activate the neurons
        nextNeurons[0].activate();
        nextNeurons[1].activate();

        console.log(nextNeurons[0].output);
        console.log(nextNeurons[1].output);

        // Install an error gradient computation spy on the previous neurons
        spyOn(previousNeurons[0], "computeErrorGradient");
        spyOn(previousNeurons[1], "computeErrorGradient");
        spyOn(previousNeurons[2], "computeErrorGradient");

        // Make the neuron compute it's error gradient
        nextNeurons[0].computeErrorGradient(0, learningRate);
        nextNeurons[1].computeErrorGradient(1, learningRate);

        // Check the cascading learn
        expect(previousNeurons[0].computeErrorGradient).toHaveBeenCalled();
        expect(previousNeurons[1].computeErrorGradient).toHaveBeenCalled();
        expect(previousNeurons[2].computeErrorGradient).toHaveBeenCalled();

        // Check the neuron's error gradient
        expect(neuron.errorGradient).toEqual(-0.02538029137503969);
    });

    it("can backpropagate it's weigth updating", function() {
        // Activate the neurons
        nextNeurons[0].activate();
        nextNeurons[1].activate();

        // Make the neuron compute it's error gradient
        nextNeurons[0].computeErrorGradient(0, learningRate);
        nextNeurons[1].computeErrorGradient(1, learningRate);

        // Install a weight updating spy on the previous neurons
        spyOn(previousNeurons[0], "updateWeights");
        spyOn(previousNeurons[1], "updateWeights");
        spyOn(previousNeurons[2], "updateWeights");

        // Make the neuron update it's weights
        nextNeurons[0].updateWeights(0, learningRate);
        nextNeurons[1].updateWeights(1, learningRate);


        // Check the cascading learn
        expect(previousNeurons[0].updateWeights).toHaveBeenCalled();
        expect(previousNeurons[1].updateWeights).toHaveBeenCalled();
        expect(previousNeurons[2].updateWeights).toHaveBeenCalled();

        // Check the new left synapses' weights
        expect(neuron.leftSynapses[0].weight).toEqual(0.5296700562121246);
        expect(neuron.leftSynapses[1].weight).toEqual(0.1189847883449984);
        expect(neuron.leftSynapses[2].weight).toEqual(0.9393908730069991);
    });
});