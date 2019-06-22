'use strict';

export default class ChartContainer extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
  }
}

customElements.define('chart-container', ChartContainer);
