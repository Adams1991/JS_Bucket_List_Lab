const Request = require("../helpers/request.js");
const PubSub = require("../helpers/pub_sub.js");


const Items = function (url) {
  this.url = 'http://localhost:3000/api/items';
  this.request = new Request(this.url);
}

Items.prototype.bindEvents = function () {
  PubSub.subscribe('ItemView:item-delete-clicked', (evt) => {
    this.deleteItem(evt.detail);
  });

  PubSub.subscribe('ItemView:item-submitted', (evt) => {
    this.postItem(evt.detail);
  })

  PubSub.subscribe('ItemView:item-complete-clicked', (evt) => {
    this.updateItem(evt.detail);
  })
};

Items.prototype.getData = function () {
  this.request.get()
    .then((items) => {
      PubSub.publish("Items:data-loaded", items);
    })
    .catch(console.error());
};


Items.prototype.postItem = function (item) {
  this.request.post(item)
    .then((items) => {
      PubSub.publish("Items:data-loaded", items);
    })
    .catch(console.error());
};

Items.prototype.deleteItem = function (itemId) {
  this.request.delete(itemId)
    .then((items) => {
      PubSub.publish('Items:data-loaded', items);
    })
    .catch(console.error);
};

Items.prototype.updateItem = function (item) {
  this.request.put(item._id, item)
    .then((items) => {
      PubSub.publish("Items:data-loaded", items);
    })
    .catch(console.error());
};

module.exports = Items;
