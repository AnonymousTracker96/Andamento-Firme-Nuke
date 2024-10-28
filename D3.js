<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grafico con D3.js</title>
    <script src="https://d3js.org/d3.v6.min.js"></script>
    <style>
        /* Stile per il grafico */
        .bar {
            fill: steelblue;
        }
        .bar:hover {
            fill: orange;
        }
        .axis--x path,
        .axis--x line {
            display: none;
        }
    </style>
</head>
<body>
    <h1>Grafico a Barre con D3.js</h1>
    <svg width="600" height="400"></svg>
    
    <script>
        // Dati di esempio
        const data = [12, 36, 20, 15, 30, 18];

        const svg = d3.select("svg");
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const width = +svg.attr("width") - margin.left - margin.right;
        const height = +svg.attr("height") - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        
        const y = d3.scaleLinear()
            .range([height, 0]);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        x.domain(data.map((d, i) => i));
        y.domain([0, d3.max(data)]);

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => x(i))
            .attr("y", d => y(d))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d));

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));
    </script>
</body>
</html>
