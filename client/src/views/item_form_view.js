const PubSub = require('../helpers/pub_sub.js')

const ItemFormView = function (form) {
  this.form = form;
};

ItemFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  });
};

ItemFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  const newItem = this.createItem(evt.target);
  PubSub.publish('ItemView:item-submitted', newItem);
  evt.target.reset();
};

ItemFormView.prototype.createItem = function (form) {
  const newItem = {
    title: form.title.value,
    complete: false
  };

  return newItem;
};

module.exports = ItemFormView;
