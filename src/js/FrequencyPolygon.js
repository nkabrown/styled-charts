'use strict';
const d3 = require('../lib/d3.min.js');

export class FrequencyPolygon {
  constructor(el, d, s, i, m, w, h, c, a) {
    this.mount = el;
    this.data = this.coerce(d);
    this.selection = s;
    this.identity = i;
    this.margin = m;
    this.width = w - this.margin.right - this.margin.left;
    this.height = h - this.margin.bottom - this.margin.top;
    this.caption = c;
    this.attribution = a;
  }

  init() {
    d3.select(`${this.identity} figcaption`)
        .text(this.caption);

    const graph = d3.select(this.mount)
        .attr('width', this.width + this.margin.right + this.margin.left)
        .attr('height', this.height + this.margin.bottom + this.margin.top)
      .append('g')
         .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    graph.append('rect')
       .attr('class', 'polygon-background')
       .attr('width', this.width + this.margin.right + this.margin.left - 11.5)
       .attr('height', this.height)
       .attr('transform', `translate(0, 0)`);

    const x = d3.scaleLinear()
        .range([0, this.width]);

    const y = d3.scaleLinear()
        .range([this.height, 0]);

    const xAxis = d3.axisBottom(x)
        .ticks(16)
        .tickSize(-this.height - 50);

    const yAxis = d3.axisLeft(y)
        .ticks(4)
        .tickSize(-this.width - 50);

    let data;
    this.selection === 'both' ? data = this.data : data = this.data.filter(d => d.group === this.selection);

    x.domain([d3.min(data, d => d.midpoint) - 5, d3.max(data, d => d.midpoint)]);
    y.domain([0, 20]);

    graph.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${this.height})`)
        .call(xAxis)
        .append('text')
        .attr('x', 93)
        .attr('y', 45)
        .style('fill', '#000')
        .style('font-family', 'Baskerville')
        .style('font-size', 14)
        .text('midpoint of class interval')
        .attr('text-anchor', 'start');

    graph.append('g')
        .attr('class', 'y-axis')
        .call(yAxis)
        .append('text')
        .attr('x', -52)
        .attr('y', -35)
        .style('fill', '#000')
        .style('font-family', 'Baskerville')
        .style('font-size', 14)
        .text('percent of cases')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-90)');

    const firstXAxis = d3.selectAll(`${this.identity} svg g.x-axis .tick`).nodes()[0]
    d3.select(firstXAxis).attr('visibility', 'hidden');
    const firstYAxis = d3.selectAll(`${this.identity} svg g.y-axis .tick`).nodes()[0];
    d3.select(firstYAxis).attr('visibility', 'hidden');

    const line = d3.line()
       .x(d => x(d.midpoint))
       .y(d => y(d.percent));

    graph.append('path')
        .datum(data.reverse())
        .attr('d', line)
        .style('fill', 'none')
        .style('stroke', '#000')
        .style('stroke-width', 2);

    graph.selectAll('.datum-point')
        .data(data.reverse())
      .enter().append('circle')
        .attr('cx', d => x(d.midpoint))
        .attr('cy', d => y(d.percent))
        .attr('r', 2)
        .style('fill', '#fff')
        .style('stroke', '#000')
        .style('stroke-width', 1.2);

    graph.append('text')
        .attr('x', 24)
        .attr('y', 27)
        .text(this.selection);

    d3.select(`${this.identity} small`)
        .text(this.attribution);
  }

  coerce(data) {
    data.forEach(d => {
      d.midpoint = +d.midpoint;
      d.percent = +d.percent;
    });
    return data;
  }
}
