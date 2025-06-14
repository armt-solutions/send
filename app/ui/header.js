const html = require('choo/html');
const Component = require('choo/component');
const Account = require('./account');
const assets = require('../../common/assets');
const { platform } = require('../utils');

class Header extends Component {
  constructor(name, state, emit) {
    super(name);
    this.state = state;
    this.emit = emit;
    this.account = state.cache(Account, 'account');
  }

  update() {
    this.account.render();
    return false;
  }

  createElement() {
    let assetMap = {};
    if (this.state.ui !== undefined) assetMap = this.state.ui.assets;
    else
      assetMap = {
        icon:
          this.state.WEB_UI.CUSTOM_ASSETS.icon !== ''
            ? this.state.WEB_UI.CUSTOM_ASSETS.icon
            : assets.get('icon.svg'),
        icon_white:
          this.state.WEB_UI.CUSTOM_ASSETS.icon_white !== ''
            ? this.state.WEB_UI.CUSTOM_ASSETS.icon_white
            : assets.get('icon_white.svg'),
        wordmark:
          this.state.WEB_UI.CUSTOM_ASSETS.wordmark !== ''
            ? this.state.WEB_UI.CUSTOM_ASSETS.wordmark
            : assets.get('wordmark.svg') + '#logo'
      };

    const title =
      platform() === 'android'
        ? html`
            <a
              class="flex flex-row items-center"
              href="https://armt.solutions/"
            >
              <img class="hidden dark:block" src="${assetMap.icon_white}" />
              <img class="dark:hidden" src="${assetMap.icon}" />
            </a>
          `
        : html`
            <a
              class="flex flex-row items-center"
              href="https://armt.solutions/"
            >
              <img
                class="hidden dark:block"
                alt="${this.state.translate('title')}"
                src="${assetMap.icon_white}"
              />
              <img
                class="dark:hidden"
                alt="${this.state.translate('title')}"
                src="${assetMap.icon}"
              />
            </a>
          `;
    return html`
      <header
        class="main-header relative flex-none flex flex-row items-center justify-between w-full px-6 md:px-8 h-16 md:h-24 z-20 bg-transparent"
      >
        ${title} ${this.account.render()}
      </header>
    `;
  }
}

module.exports = Header;
