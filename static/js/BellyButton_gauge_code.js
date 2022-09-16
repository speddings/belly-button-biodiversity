


// Create the buildChart function.
    function buildCharts(sample) {
    // Use d3.json to load the samples.json file 
    d3.json("samples.json").then((data) => {
        console.log(data);

    // BAR & BUBBLE
        // Create a variable that holds the samples array. 
      //  d3.json("samples.json").then((data) => {
        // Create a variable that filters the samples for the object with the desired sample number.
			var samples = data.samples;
			var resultsArray = samples.filter(Obj => Obj.id == sample);

    // GAUGE
        // 1. Create a variable that filters the metadata array for the object with the desired sample number.
		// show the metadata for the id selected
			var metadata = data.metadata;
			var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // BAR & BUBBLE
        // Create a variable that holds the first sample in the array.
			var result = resultsArray[0];

    // GAUGE
        // 2. Create a variable that holds the first sample in the metadata array.
			var metaResult = metadataArray[0];

    // BAR & BUBBLE
        // Create variables that hold the otu_ids, otu_labels, and sample_values.
			var oIDs = result.otu_ids;
			var oLabels = result.otu_labels;
			var oValues = result.sample_values;   

        // 3. Create a variable that holds the washing frequency.
		// convert the washing frequency to a floating point number.
			var wFreq = parseInt(metaResult.wfreq);

    // BAR & BUBBLE
        // Create the yticks for the bar chart.
			var yticks = oIDs.slice(0,10).reverse().map(function (elem) {return `OTU ${elem}`});
			var xticks = oValues.slice(0,10).reverse();
			var labels = oLabels.slice(0,10).reverse();

        // Use Plotly to plot the bar data and layout.
        Plotly.newPlot("bar", [barData], barLayout)
        
        // Use Plotly to plot the bubble data and layout.
        Plotly.newPlot("bubble", [bubbleData], bubbleLayout); 
    
    // GAUGE
        // 4. Create the trace for the gauge chart.
			var gaugeData = {
				value: wFreq,
				title: {text: "Belly Button Washing Frequency<br>Scrubs per Week"},
				type: "indicator",
				mode: "gauge+number",
				gauge: {
					axis: {range: [0,10]},
					steps: [
					{range: [0,2], color:"#ea2c2c"},
					{range: [2,4], color:"#ea822c"},
					{range: [4,6], color:"#ee9c00"},
					{range: [6,8], color:"#eecc00"},
					{range: [8,10], color:"#d4ee00"}
					]
				}
			};
			
        // 5. Create the layout for the gauge chart.
			var gaugeLayout = { 
			width: 600, height: 450, margin: {t: 0, b: 0}
			};

        // 6. Use Plotly to plot the gauge data and layout.
        Plotly.newPlot("gauge", [gaugeData], gaugeLayout);

		});
	};
}