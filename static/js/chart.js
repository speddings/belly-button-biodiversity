function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var samples = data.samples;    
    var resultsArray = samples.filter(Obj => Obj.id == sample);
    
  // GAUGE
      // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
    //  5. Create a variable that holds the first sample in the array.
    var result = resultsArray[0];
  
  // GAUGE
      // 2. Create a variable that holds the first sample in the metadata array.
    var metaResult = metadataArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var oIDs = result.otu_ids;
    var oLabels = result.otu_labels;
    var oValues = result.sample_values;   

// GAUGE
    // 3. Create a variable that holds the washing frequency.
    var wFreq = parseInt(metaResult.wfreq);
    
    
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = oIDs.slice(0,10).reverse().map(function (elem) {return `OTU ${elem}`});
    var xticks = oValues.slice(0,10).reverse();
    var labels = oLabels.slice(0,10).reverse();

    // 8. Create the trace (barData) for the bar chart. 
    var barData = {
      x: xticks,
      y: yticks,
      type: 'bar',
      orientation: 'h',
      text: labels,
      marker:{
        color: '#2C60EA'
      }
      
    };
    // 9. Create the layout (barLayout) for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
     
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", [barData], barLayout)


  


    /*
    BUBBLE CHART
    */

    // 1. Create the trace for the bubble chart.
    var bubbleData = {
      x: oIDs,
      y: oValues,
      text: oLabels,
      mode: 'markers',
      marker: {
        size: oValues,
        color: '#2C60EA'
      }
    };
    

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      showlegend: false
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", [bubbleData], bubbleLayout); 


    
   /* 
   GAUGE CHART
   */
      // 4. Create the trace for the gauge chart.
    var gaugeData = {
      value: wFreq,
      title: {text: "Belly Button Washing Frequency<br>Scrubs per Week"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        bar: {color: 'white'},
        axis: {range: [0,10]},
        steps: [
        {range: [0,2], color:"#2c60ea"},
        {range: [2,4], color:"#6188ef"},
        {range: [4,6], color:"#7b9cf2"},
        {range: [6,8], color:"#b0c3f7"},
        {range: [8,10], color:"#e5ebfc"}
        ]
      }
    };
    
      // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
    width: 458, height: 450, margin: {t: 0, b: 0}
    };

      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge", [gaugeData], gaugeLayout);


  });
}
