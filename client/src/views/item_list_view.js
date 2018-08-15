const PubSub = require('../helpers/pub_sub.js');
const ItemView = require('./item_view.js');

const ItemListView = function (container) {
  this.container = container;
};

ItemListView.prototype.bindEvents = function () {
  PubSub.subscribe('Items:data-loaded', (evt) => {
    this.render(evt.detail);
  });
};

ItemListView.prototype.render = function (items) {
  this.container.innerHTML = '';
  items.forEach((item) => {
    const itemView = new ItemView(this.container, item);
    itemView.render();
  });

};

module.exports = ItemListView;
