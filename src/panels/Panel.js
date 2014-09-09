var ui = require('../util/ui');

function Panel(game, parent) {
    this.game = game;
    this.parent = parent;

    this.name = '';
    this.title = '';
    this.active = false;

    this._panel = null;
}

Panel.prototype.constructor = Panel;

module.exports = Panel;

//builds the html for a panel
Panel.prototype.createPanelElement = function () {
    var div = this._panel = document.createElement('div');
    ui.addClass(div, 'pdebug-panel ' + this.name);

    return div;
};

//builds the html for this panels menu item
Panel.prototype.createMenuElement = function () {
    var div = this._menuItem = document.createElement('div');
    ui.addClass(div, 'pdebug-menu-item ' + this.name);
    ui.setText(div, this.title);

    return div;
};

Panel.prototype.toggle = function () {
    if (this._panel.style.display === 'block') {
        this.hide();
        this.active = false;
    } else {
        this.show();
        this.active = true;
    }
};

Panel.prototype.show = function () {
    ui.setStyle(this._panel, 'display', 'block');
};

Panel.prototype.hide = function () {
    ui.setStyle(this._panel, 'display', 'none');
};