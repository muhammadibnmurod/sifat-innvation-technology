import crudRouter from "./_crud.js";

export default crudRouter({
  table: "news",
  orderBy: "date DESC, id DESC",
  publicFilter: "published = 1",
  fields: [
    { name: "title", required: true },
    { name: "excerpt" },
    { name: "body" },
    { name: "image" },
    { name: "category" },
    { name: "date" },
    { name: "published", default: 1 },
  ],
});
