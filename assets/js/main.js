var sel = "#chart",
    oal = $(sel).width(),
    ratio = .8,
    margin = { top: 20, right: 80, bottom: 30, left: 128 },
    width = oal - margin.left - margin.right,
    height = (oal * ratio) - margin.top - margin.bottom;

function chart() {

    var y = d3.scaleBand()
        .range([0, height])
        .padding(.2);

    var x = d3.scaleLinear()
        .range([0, width]);

    var c = d3.scaleSequential(d3.interpolateGnBu);

    var svg = d3.select(sel).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("assets/data/data.csv", function (error, data) {
        if (error) throw error;

        data.forEach(function (d) {
            d.avg = +d.avg;
        });

        data.sort((a, b) => (a.avg > b.avg) ? -1 : 1);

        x.domain([0, d3.max(data, function (d) { return d.avg; })]);
        y.domain(data.map(function (d) { return d.type; }));
        c.domain([0, d3.max(data, function (d) { return d.avg; })]);

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()

        bars.append("rect")
            .attr("class", "bar")
            .style("fill", function (d, i) { return c(d.avg); })
            .attr("width", 0)
            .attr("y", function (d) { return y(d.type); })
            .attr("height", y.bandwidth())
            .attr("opacity", 0)
            .transition()
            .duration(500)
            .delay(function (d, i) {
                return i * 100;
            })
            .attr("width", function (d) { return x(d.avg); })
            .attr("opacity", 1);

        svg.append("g")
            .attr("transform", "translate(0,0)")
            .call(d3.axisLeft(y));

        bars.append("text")
            .attr("class", "label")
            .attr("fill", "#000")
            .attr("y", function (d) {
                return y(d.type) + y.bandwidth() / 2 + 4;
            })
            .attr("x", 5)
            .attr("opacity", 0)
            .text(function (d) {
                return parseFloat(d.avg.toFixed(2)) + "%";
            })
            .transition()
            .duration(500)
            .delay(function (d, i) {
                return i * 100;
            })
            .attr("x", function (d) {
                return x(d.avg) + 5;
            })
            .attr("opacity", 1);
    })
}

$(document).ready(function (e) {
    chart();

    enterView({
        selector: 'section',
        enter: function (el) {
            if (el.id == "header") {
                $(el).addClass('show animated fadeInDown')
            }
            else {
                $(el).addClass('show animated fadeIn')
            }
        }
    });

    $(window).resize(function () {
        oal = $(sel).width();
        width = oal - margin.left - margin.right;
        height = (oal * ratio) - margin.top - margin.bottom;
        $(sel).empty()
        chart();
    })
})