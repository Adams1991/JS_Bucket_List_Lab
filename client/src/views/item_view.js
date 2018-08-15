const PubSub = require('../helpers/pub_sub.js');

const ItemView = function (container, item) {
  this.container = container;
  this.item = item;
};

ItemView.prototype.render = function () {
  const itemContainer = document.createElement('div');
  itemContainer.id = 'item';


  const title = this.createHeading(this.item.title);
  itemContainer.appendChild(title);

  const doneTitle = document.createElement('p');
  doneTitle.textContent = 'Completed?';
  itemContainer.appendChild(doneTitle);

  const done = document.createElement('p');
  done.textContent = this.item.complete;
  itemContainer.appendChild(done);

  const complete = this.createCompleteButton(this.item._id);
  itemContainer.appendChild(complete);

  const deleteButton = this.createDeleteButton(this.item._id);
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

ItemView.prototype.createCompleteButton = function () {
  const button = document.createElement('checkbox');
  button.textContent = "Complete";
  button.classList.add('button-btn');

  button.addEventListener('click', (evt) => {
    this.item.complete = true;
    PubSub.publish('ItemView:item-complete-clicked', this.item);
  });

  return button;
};

ItemView.prototype.createDeleteButton = function (itemId) {
  const button = document.createElement('button');
  button.textContent = "Delete";
  button.classList.add('delete-btn');
  button.value = itemId;

  button.addEventListener('click', (evt) => {
    PubSub.publish('ItemView:item-delete-clicked', evt.target.value);
  });

  return button;
};

module.exports = ItemView;
