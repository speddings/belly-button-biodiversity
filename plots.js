/* Dynamic menu items
In this code, note that the `forEach()` method is called on the sampleNames array.
For each element in the array, a dropdown menu option is appended. 
The text of each dropdown menu option is the ID. 
Its value property is also assigned the ID.
*/

function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}

  /* connects to the html dynamic select 'this.value'  
  *  its the change trigger
  * newSample = volunteer id
  */
  function optionChanged(newSample) {
    console.log(newSample);
  }

  //print demographic info attached to the id
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

  /*
  pull the dataset for the ID
  (47) the metadata array in the dataset (data.metadata) is assigned the variable metadata.
  (48) the [filter() method] is called on the metadata array to filter for an object in the array whose id property matches the newSample [ID] from buildMetadata().
  (49) the first item in the array (resultArray[0]) is selected and assigned the variable result.
  (50) The d3.select() method is used to select this <div>, and the variable PANEL is assigned to it.
  (52) PANEL.html("") ensures that the contents of the panel are cleared when another ID number is chosen
  (53) the append() and text() methods are chained to append a H6 heading to the panel and print the location of the volunteer to the panel, respectively.
  */
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text(`ID: ${result.id}`);
      PANEL.append("h6").text(`ETHNICITY: ${result.ethnicity}`);
      PANEL.append("h6").text(`GENDER: ${result.gender}`);
      PANEL.append("h6").text(`AGE: ${result.age}`);
      PANEL.append("h6").text(`LOCATION: ${result.location}`);
      PANEL.append("h6").text(`BBTYPE: ${result.bbtype}`);
      PANEL.append("h6").text(`WFREQ: ${result.wfreq}`);
    });
  }

  init();