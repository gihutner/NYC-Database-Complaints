let chart = function () {
    let boroughs = [
        { borough: 'BRONX', value: 21909 },
        { borough: 'BROOKLYN', value: 27953 },
        { borough: 'MANHATTAN', value: 25273 },
        { borough: 'QUEENS', value: 20051 },
        { borough: 'STATEN ISLAND', value: 3925 },
    ];

    let svg = d3
        .select('#myChart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // d3.csv('data/data.json').then((boroughs) => {
    console.log(boroughs);
    // set the x / y output ranges

    let x = d3.scaleBand().range([0, width]).padding(0.1);
    let y = d3.scaleLinear().range([height, 0]);
    // set the x / y input domains
    x.domain(boroughs.map((borough) => borough.borough));
    y.domain([0, d3.max(boroughs, (borough) => +borough.value)]);

    const mousemove = (event, d) => {
        const text = d3.select('.tooltip-area__text');
        text.text(`${boroughs.value}`);
        const [x, y] = d3.pointer(event);
    };

    var div = d3
        .select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    // append the rectangles for the bar chart
    svg.selectAll('bar')
        .data(boroughs)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.borough))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => height - y(d.value))
        // .on('mousemove', mousemove)
        //change grams to values - take out d.color
        .on('mouseenter', function (event, d) {
            var bar = d3.select(this);
            // console.log(bar.attr('x') + bar.attr('width') / 2);
            bar.attr('opacity', 0.5);

            div.transition().duration(200).style('opacity', 1);
            let x = +bar.attr('x');
            let w = +bar.attr('width');
            x += w;
            let y = +bar.attr('y');
            let h = +bar.attr('height');
            y += 90;
            div.html(d.value)
                .style('left', x + 'px') // HELP W THIS
                .style('top', y + 'px'); // HELP W THIS
        })
        .on('mouseleave', function () {
            d3.select(this).attr('opacity', 1);
            div.transition().duration(200).style('opacity', 0);
        });

    // add the x Axis
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    svg.append('text')
        .attr(
            'transform',
            'translate(' + width / 2 + ' ,' + (height + margin.top + 20) + ')'
        )
        .style('text-anchor', 'middle')
        .attr('class', 'label')
        .text('Borough');

    // add the y Axis
    svg.append('g').call(d3.axisLeft(y));

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - height / 2)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .attr('class', 'label')
        .text('# of Complaints');

    var bars = g.selectAll('.bar').data(fillerCounts);
    var barsE = bars.enter().append('rect').attr('class', 'bar');
    bars = bars
        .merge(barsE)
        .attr('x', 0)
        .attr('y', function (d, i) {
            return yBarScale(i);
        })
        .attr('fill', function (d, i) {
            return barColors[i];
        })
        .attr('width', 0)
        .attr('height', yBarScale.bandwidth());

    var barText = g.selectAll('.bar-text').data(fillerCounts);
    barText
        .enter()
        .append('text')
        .attr('class', 'bar-text')
        .text(function (d) {
            return d.key + '…';
        })
        .attr('x', 0)
        .attr('dx', 15)
        .attr('y', function (d, i) {
            return yBarScale(i);
        })
        .attr('dy', yBarScale.bandwidth() / 1.2)
        .style('font-size', '110px')
        .attr('fill', 'white')
        .attr('opacity', 0);
};

var setupVis = function () {
    // axis
    g.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxisBar);
    g.select('.x.axis').style('opacity', 0);

    // count openvis title
    g.append('text')
        .attr('class', 'title openvis-title')
        .attr('x', width / 2)
        .attr('y', height / 3)
        .text('2013');

    g.append('text')
        .attr('class', 'sub-title openvis-title')
        .attr('x', width / 2)
        .attr('y', height / 3 + height / 5)
        .text('OpenVis Conf');

    g.selectAll('.openvis-title').attr('opacity', 0);

    // count filler word count title
    g.append('text')
        .attr('class', 'title count-title highlight')
        .attr('x', width / 2)
        .attr('y', height / 3)
        .text('180');

    g.append('text')
        .attr('class', 'sub-title count-title')
        .attr('x', width / 2)
        .attr('y', height / 3 + height / 5)
        .text('Filler Words');

    g.selectAll('.count-title').attr('opacity', 0);
};

function showTitle() {
    g.selectAll('.count-title').transition().duration(0).attr('opacity', 0);

    g.selectAll('.openvis-title')
        .transition()
        .duration(600)
        .attr('opacity', 1.0);
}

function showFillerTitle() {
    g.selectAll('.openvis-title').transition().duration(0).attr('opacity', 0);

    g.selectAll('.square').transition().duration(0).attr('opacity', 0);

    g.selectAll('.count-title').transition().duration(600).attr('opacity', 1.0);
}

function showBar() {
    // ensure bar axis is set
    showAxis(xAxisBar);

    g.selectAll('.square').transition().duration(800).attr('opacity', 0);

    g.selectAll('.fill-square')
        .transition()
        .duration(800)
        .attr('x', 0)
        .attr('y', function (d, i) {
            return yBarScale(i % 3) + yBarScale.bandwidth() / 2;
        })
        .transition()
        .duration(0)
        .attr('opacity', 0);

    g.selectAll('.hist')
        .transition()
        .duration(600)
        .attr('height', function () {
            return 0;
        })
        .attr('y', function () {
            return height;
        })
        .style('opacity', 0);

    g.selectAll('.bar')
        .transition()
        .delay(function (d, i) {
            return 300 * (i + 1);
        })
        .duration(600)
        .attr('width', function (d) {
            return xBarScale(d.value);
        });

    g.selectAll('.bar-text')
        .transition()
        .duration(600)
        .delay(1200)
        .attr('opacity', 1);
}

function showAxis(axis) {
    g.select('.x.axis')
        .call(axis)
        .transition()
        .duration(500)
        .style('opacity', 1);
}

/**
 * hideAxis - helper function
 * to hide the axis
 *
 */
function hideAxis() {
    g.select('.x.axis').transition().duration(500).style('opacity', 0);
}

function display(data) {
    // create a new plot and
    // display it
    var plot = scrollVis();
    d3.select('#vis').datum(data).call(plot);

    // setup scroll functionality
    var scroll = scroller().container(d3.select('#graphic'));

    // pass in .step selection as the steps
    scroll(d3.selectAll('.step'));

    // setup event handling
    scroll.on('active', function (index) {
        // highlight current step text
        d3.selectAll('.step').style('opacity', function (d, i) {
            return i === index ? 1 : 0.1;
        });

        // activate current section
        plot.activate(index);
    });

    scroll.on('progress', function (index, progress) {
        plot.update(index, progress);
    });
}

display();
