'use strict';

const ChartSheet = new CSSStyleSheet();

export default class ChartContainer extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.adoptedStyleSheets = [ChartSheet];
  }

  connectedCallback() {
    ChartSheet.replace(`@import url("src/css/60s-textbook.css")`)
        .then(sheet => { 
          console.log(`imports added`);
        })
        .catch(error => {
          console.log('ERROR: ', error);
        });
  }
}

customElements.define('chart-container', ChartContainer);
