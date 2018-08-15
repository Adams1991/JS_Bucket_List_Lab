const ItemFormView = require('./views/item_form_view.js')
const ItemListView = require('./views/item_list_view.js');
const Items = require("./models/items.js")

document.addEventListener('DOMContentLoaded', () => {
  const itemsForm = document.querySelector('form#list-form');
  const itemsFormView = new ItemFormView(itemsForm);
  itemsFormView.bindEvents();

  const itemsContainer = document.querySelector('div#items');
  const itemsGridView = new ItemListView(itemsContainer);
  itemsGridView.bindEvents();


  const items = new Items();
  items.bindEvents();
  items.getData();
})
