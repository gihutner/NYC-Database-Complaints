// set the dimensions and margins of the graph
pieChart();

let people = [
    { name: 'gingy', grade: 12 },
    { name: 'taco', grade: 0 },
    {
        name: 'ashi',
        grade: 12,
    },
    { name: 'daniel', grade: 11 },
];
people = people.filter((person) => person.grade >= 12);
console.log(people);

function pieChart() {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 150, left: 90 },
        width = 660 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
        .select('#lollipopChart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Parse the Data
    d3.csv('data/output2.csv', function (data) {
        // X axis
        // console.log(data);
        data = data.filter((val) => val[0] > 100);
        // console.log(data);
        var x = d3
            .scaleBand()
            .range([0, width])
            .domain(
                data.map(function (d) {
                    return d.ofns_desc;
                })
            )
            .padding(1);
        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'translate(-10,0)rotate(-45)')
            .style('text-anchor', 'end');

        // Add Y axis
        var y = d3.scaleLinear().domain([0, 25000]).range([height, 0]);
        svg.append('g').call(d3.axisLeft(y));
        // Lines
        svg.selectAll('myline')
            .data(data)
            .enter()
            .append('line')
            .attr('x1', function (d) {
                return x(d.ofns_desc);
            })
            .attr('x2', function (d) {
                return x(d.ofns_desc);
            })
            .attr('y1', function (d) {
                return y(d[0]);
            })
            .attr('y2', y(0))
            .attr('stroke', 'grey');

        // Circles
        svg.selectAll('mycircle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', function (d) {
                return x(d.ofns_desc);
            })
            .attr('cy', function (d) {
                return y(d[0]);
            })
            .attr('r', '4')
            .style('fill', '#69b3a2')
            .attr('stroke', 'black');
    });
}
