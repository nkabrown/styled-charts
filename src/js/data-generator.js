'use strict';
import ChartContainer from './ChartContainer';
import { FrequencyPolygon } from './FrequencyPolygon';
const d3 = require('../lib/d3.min.js');

export const dataGenerator = (mount, dataPath, template, caseName) => {
  d3.csv(dataPath, (error, data) => {
    if (error) throw error;

    d3.text(template, str => {

      const box = d3.select('.container').append('chart-container').attr('id', mount).node();
      const shadowRoot = box.shadowRoot;
      shadowRoot.innerHTML = str;

      switchcaseF({
        'FREQ-POLY': () => new FrequencyPolygon(shadowRoot, data, 'both', `#${mount}`, {top:20,right:20,bottom:60,left:45}, 570, 465, '', 'Strong, E. K., Jr. Nineteen-year followup of engineer interests. J. appl. Psychol., 1952, 36, 65-74.').init(),
        'FREQ-POLY-ENG': () => new FrequencyPolygon(shadowRoot, data, 'engineers', `#${mount}`, {top:20,right:20,bottom:60,left:45}, 375, 265, '', '').init(),
        'FREQ-POLY-FRESH': () => new FrequencyPolygon(shadowRoot, data, 'freshmen', `#${mount}`, {top:20,right:20,bottom:60,left:45}, 375, 265, '', '').init()
      })(caseName);
    });
  });
}

const switchcase = cases => key => key in cases ? cases[key] : null;

const switchcaseF = cases => key => switchcase(cases)(key)();
