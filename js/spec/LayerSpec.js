describe("A layer", function() {

    var layer;
    var previousLayer;

    beforeEach(function() {
        // Creating the previous layer
        previousLayer = new Layer(3);

        // Feed the previous layer's values
        previousLayer.neurons[0].output = 1;
        previousLayer.neurons[1].output = 0;
        previousLayer.neurons[2].output = 1;

        // Creating and linking the current layer
        layer = new Layer(4);
        layer.linkTo(previousLayer);

        // Setting the current layers' neurons' biases
        layer.neurons[0].threshold = 0.23;
        layer.neurons[1].threshold = 0.05;
        layer.neurons[2].threshold = 0.74;
        layer.neurons[3].threshold = 0.32;

        // Setting the current layers' neurons' synapses' weights
        layer.neurons[0].leftSynapses[0].weight = 0.45;
        layer.neurons[0].leftSynapses[1].weight = 0.34;
        layer.neurons[0].leftSynapses[2].weight = 0.22;

        layer.neurons[1].leftSynapses[0].weight = 0.99;
        layer.neurons[1].leftSynapses[1].weight = 0.67;
        layer.neurons[1].leftSynapses[2].weight = 0.01;

        layer.neurons[2].leftSynapses[0].weight = 0.21;
        layer.neurons[2].leftSynapses[1].weight = 0.56;
        layer.neurons[2].leftSynapses[2].weight = 0.67;

        layer.neurons[3].leftSynapses[0].weight = 0.09;
        layer.neurons[3].leftSynapses[1].weight = 0.89;
        layer.neurons[3].leftSynapses[2].weight = 0.34;
    });

    it("is linked to previous layer", function() {
        // Check the link
        for (var neuronIndex = 0; neuronIndex < layer.neurons.length; neuronIndex++) {
            var neuron = layer.neurons[neuronIndex];

            // Check the number of links
            expect(neuron.leftSynapses.length).toEqual(previousLayer.neurons.length);

            // Check the synapses' neurons against the previous layer's neurons
            for (var previousNeuronIndex = 0; previousNeuronIndex < previousLayer.neurons.length; previousNeuronIndex++) {
                var previousNeuron = previousLayer.neurons[previousNeuronIndex];

                // Check the neuron's left hand side synapses
                expect(neuron.leftSynapses[previousNeuronIndex].leftNeuron).toEqual(previousNeuron);

                // Check the previous neuron's right hand side synapses
                expect(previousNeuron.rightSynapses[neuronIndex].rightNeuron).toEqual(neuron);
            }
        }
    });

    it("can forward propagate", function() {
        // Compute the current layer's neurons' output
        layer.activate();

        // Check the output values
        expect(layer.neurons[0].output).toEqual(0.6082590307465144);
        expect(layer.neurons[1].output).toEqual(0.7211151780228631);
        expect(layer.neurons[2].output).toEqual(0.5349429451582145);
        expect(layer.neurons[3].output).toEqual(0.5274723043445937);
    });
});