const PubSub = require('../helpers/pub_sub.js');

const ItemView = function (container) {
  this.container = container;
};

ItemView.prototype.render = function (item) {
  const itemContainer = document.createElement('div');
  itemContainer.id = 'item';

  const title = this.createHeading(item.title);
  itemContainer.appendChild(title);

  const complete = this.createCompleteButton(item._id);
  itemContainer.appendChild(complete);

  const deleteButton = this.createDeleteButton(item._id);
  itemContainer.appendChild(deleteButton);

  this.container.appendChild(itemContainer);
};

ItemView.prototype.createHeading = function (textContent) {
  const heading = document.createElement('h3');
  heading.textContent = textContent;
  return heading;
};

ItemView.prototype.createDetail = function (label, text) {
  const detail = document.createElement('p');
  detail.textContent = `${label}: ${text}`;
  return detail;
};

ItemView.prototype.createCompleteButton = function (itemId) {
  const button = document.createElement('button');
  button.classList.add('button-btn');
  button.value = itemId;

  button.addEventListener('click', (evt) => {
    PubSub.publish('ItemView:item-complete-clicked', evt.target.value);
  });

  return button;
};
ItemView.prototype.createDeleteButton = function (itemId) {
  const button = document.createElement('button');
  button.classList.add('delete-btn');
  button.value = itemId;

  button.addEventListener('click', (evt) => {
    PubSub.publish('ItemView:item-delete-clicked', evt.target.value);
  });

  return button;
};

module.exports = ItemView;
