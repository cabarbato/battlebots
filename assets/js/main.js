d3.csv("assets/data/data.csv", function (error, data) {
    if (error) throw error;

    data.forEach(function (d) {
        d.percentage = +d.percentage;
    });

    var dataNew = []

    data.forEach(function (d) {
        var type = d.type
        var result = data.filter(function (d) {
            return d.type == type
        })
        result.sort((a, b) => (a.robot > b.robot) ? 1 : -1);
        dataNew.push({ type, result })
    });

    dataNew.sort((a, b) => (a.type > b.type) ? 1 : -1);

    function getUnique(arr, comp) {
        const unique = arr
            .map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }

    var unique = getUnique(dataNew, 'type')

    var data = unique.map(function (d) {
        var type = d.type,
            results = d.result,
            length = results.length,
            match = 0,
            percent = 0;

        for (i = 0; i < length; i++) {
            match += results[i]["Total matches"]
            percent += results[i]["percentage"]
        }
        var percentage = (percent / length) / 100

        return { type, percentage }
    })

    data.sort((a, b) => (a.percentage > b.percentage) ? 1 : -1);

    var margin = {
        top: 15,
        right: 50,
        bottom: 15,
        left: 250
    };

    var width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.linear()
        .range([0, width])
        .domain([0, d3.max(data, function (d) {
            return d.percentage;
        })]);

    var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .1)
        .domain(data.map(function (d) {
            return d.type;
        }));


    var yAxis = d3.svg.axis()
        .scale(y)

        .tickSize(0)
        .orient("left");

    var gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")


    bars.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return y(d.type);
        })
        .attr("height", y.rangeBand())
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d.percentage);
        });


    bars.append("text")
        .attr("class", "label")

        .attr("y", function (d) {
            return y(d.type) + y.rangeBand() / 2 + 4;
        })

        .attr("x", function (d) {
            return x(d.percentage) + 3;
        })
        .text(function (d) {
            return Number.parseFloat(d.percentage * 100).toFixed(0) + "%";
        });

});