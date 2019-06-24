'use strict';
import { dataGenerator } from './data-generator';
const d3 = require('../lib/d3.min.js');

dataGenerator('freq-polygon-1', 'src/data/engineering-interest.csv', 'src/template/chart.html', 'FREQ-POLY-ENG', '60s-textbook.css');
dataGenerator('freq-polygon-2', 'src/data/engineering-interest.csv', 'src/template/chart.html', 'FREQ-POLY-ENG', 'modern.css');
