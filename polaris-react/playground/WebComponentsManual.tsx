import React from 'react';
import {html, css, LitElement} from 'lit';
// eslint-disable-next-line import/extensions
import {customElement, property} from 'lit/decorators.js';

// eslint-disable-next-line @shopify/strict-component-boundaries
import styles from '../src/components/TextStyle/TextStyle.scss';

// export class UIText extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({mode: 'open'});
//   }

//   getVariationClass() {
//     const variation = this.getAttribute('variation');

//     if (!variation) {
//       return undefined;
//     }

//     return styles[
//       `variation${variation
//         .slice(0, 1)
//         .toUpperCase()
//         .concat(variation.slice(1))}`
//     ];
//   }

//   connectedCallback() {
//     const {shadowRoot} = this;
//     // This doesn't work with styles defined outside of the shadow dom
//     shadowRoot.innerHTML = `<span class="${this.getVariationClass()}"><slot/></span>`;
//   }
// }

// customElements.define('ui-text', UIText);

@customElement('ui-text')
export class UIText extends LitElement {
  getVariationClass() {
    const variation = this.getAttribute('variation');

    if (!variation) {
      return undefined;
    }

    return styles[
      `variation${variation
        .slice(0, 1)
        .toUpperCase()
        .concat(variation.slice(1))}`
    ];
  }

  render() {
    // This doesn't work with styles defined outside of the shadow dom
    return html`<span class="${this.getVariationClass()}"><slot /></span>`;
  }
}

export function WebComponentsManual() {
  return (
    <div>
      <ui-text variation="positive">text style content</ui-text>
    </div>
  );
}
