import crudRouter from "./_crud.js";

export default crudRouter({
  table: "faq",
  fields: [
    { name: "question", required: true },
    { name: "answer", required: true },
    { name: "sort_order", default: 0 },
  ],
});
