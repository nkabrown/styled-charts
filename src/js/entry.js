'use strict';
import { dataGenerator } from './data-generator';
const d3 = require('../lib/d3.min.js');

dataGenerator('freq-polygon-1', 'src/data/engineering-interest.csv', 'src/template/chart.html', 'FREQ-POLY-ENG');
dataGenerator('freq-polygon-2', 'src/data/engineering-interest.csv', 'src/template/chart.html', 'FREQ-POLY-ENG');
dataGenerator('freq-polygon-3', 'src/data/engineering-interest.csv', 'src/template/chart.html', 'FREQ-POLY-ENG');
dataGenerator('freq-polygon-4', 'src/data/engineering-interest.csv', 'src/template/chart.html', 'FREQ-POLY-ENG');
