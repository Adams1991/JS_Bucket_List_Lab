use bucketlist;
db.dropDatabase();

db.items.insertMany([
  {
    title: "Get a job",
    complete: false
  },
  {
    title: "Go to Japan",
    complete: false
  }
]);
