const Items = require("./models/items.js")

document.addEventListener('DOMContentLoaded', () => {
  const items = new Items();
  items.getData();
})
