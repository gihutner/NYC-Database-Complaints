// example: https://bl.ocks.org/d3noob/08cc6159b9315e20e74a72e85a50dd3e
barChart();

function barChart() {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 150, left: 100 },
        width = 700 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
        .select('#barChart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Parse the Data
    d3.csv('data/races.csv', function (data) {
        // X axis
        console.log(data);
        var x = d3
            .scaleBand()
            .range([0, width])
            .domain(
                data.map(function (d) {
                    return d.susp_race;
                })
            )
            .padding(0.2);
        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'translate(-10,0)rotate(-45)')
            .style('text-anchor', 'end');

        // Add Y axis
        var y = d3.scaleLinear().domain([0, 30000]).range([height, 0]);
        svg.append('g').call(d3.axisLeft(y));

        // Bars
        svg.selectAll('mybar')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', function (d) {
                return x(d.susp_race);
            })
            .attr('width', x.bandwidth())
            .attr('fill', '#69b3a2')
            // no bar at the beginning thus:
            .attr('height', function (d) {
                return height - y(0);
            }) // always equal to 0
            .attr('y', function (d) {
                return y(0);
            });

        // Animation
        svg.selectAll('rect')
            .transition()
            .duration(800)
            .attr('y', function (d) {
                return y(d[0]);
            })
            .attr('height', function (d) {
                return height - y(d[0]);
            })
            .delay(function (d, i) {
                console.log(i);
                return i * 100;
            });
    });
}
