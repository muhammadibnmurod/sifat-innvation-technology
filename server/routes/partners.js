import crudRouter from "./_crud.js";

export default crudRouter({
  table: "partners",
  fields: [
    { name: "name", required: true },
    { name: "logo" },
    { name: "url" },
    { name: "sort_order", default: 0 },
  ],
});
