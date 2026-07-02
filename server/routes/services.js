import crudRouter from "./_crud.js";

export default crudRouter({
  table: "services",
  publicFilter: "active = 1",
  fields: [
    { name: "title", required: true },
    { name: "description" },
    { name: "icon", default: "Wrench" },
    { name: "image" },
    { name: "sort_order", default: 0 },
    { name: "active", default: 1 },
  ],
});
