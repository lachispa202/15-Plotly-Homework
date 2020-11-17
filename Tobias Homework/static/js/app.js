// Belly Button Biodiversity Homework

function init() {

    // TEST Subject ID Information:

    var selector = d3.select('#selDataset');
    d3.json("./static/js/data/samples.json").then((importedData) => {
        console.log(importedData);
        var data = importedData;
        var subjectID = data.names;
        subjectID.forEach((ID) => {
            selector
                .append('option')
                .text(ID)
                .property('value', ID);
        });
        const button = subjectID[0]
        // d3.selectAll('#selDataset').on('change', updateMetadata);
    });
}

// function updateMetadata() {

// Demographic Info:
d3.json("./static/js/data/samples.json").then((importedData) => {
    var data = importedData
    var metadata = data.metadata;
    var filterArray = metadata.filter(sampleObject => sampleObject.id);
    var result = filterArray[0];
    var demoPanel = d3.select('#sample-metadata');
    demoPanel.html("");
    Object.entries(result).forEach(([key, value]) => {
        demoPanel.append("h6").text(`${key}: ${value}`)

    })
});
// }

// Plotly for graphs

// function updateCharts(sample) {

d3.json("./static/js/data/samples.json").then((importedData) => {
    console.log(importedData);
    var data = importedData;
    var samples = data.samples;
    var filterArray = samples.filter(sampleObject => sampleObject.id);
    var result = filterArray[0];
    var sample_values = result.sample_values;
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    //  Create the Traces - Bubble Chart
    var trace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Blue"
        }
    };

    // Create the data array for the plot
    var chartData = [trace];

    // Titles
    var layout = {
        title: "Bacteria Culture Per Sample",
        margin: { l: 100, r: 100, t: 100, b: 100 }
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot('bubble', chartData, layout);

    //  Create the Traces - Bar Chart
    var trace1 = {
        x: sample_values.slice(0, 10).reverse(),
        y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        name: name,
        type: "bar",
        orientation: "h"
    };

    // Create the data array for the plot
    var chartData = [trace1];

    // Titles
    var layout = {
        title: "Top 10 Individual OTUs",
        margin: { l: 100, r: 100, t: 100, b: 100 }
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot('bar', chartData, layout);
})

// }


init();
