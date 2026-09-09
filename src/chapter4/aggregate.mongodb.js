use("ecommerce");

// db.orders.aggregate([
//   { $group: { _id: null, totalRevenue: { $sum: "$total" } } },
// ]);
//db.orders.aggregate([{ $group: { _id: "$status", totalOrders: { $sum: 1 } } }]);
// db.orders.aggregate([
//   {
//     $lookup: {
//       from: "products",
//       localField: "products.name",
//       foreignField: "name",
//       as: "productDetails",
//     },
//   },
// ]);

// db.sales.insertMany([
//   { _id: 1, item: "Apple", price: 10, quantity: 5, category: "Fruit" },
//   { _id: 2, item: "Banana", price: 5, quantity: 10, category: "Fruit" },
//   { _id: 3, item: "Carrot", price: 8, quantity: 6, category: "Vegetable" },
//   { _id: 4, item: "Tomato", price: 6, quantity: 8, category: "Vegetable" },
//   { _id: 5, item: "Mango", price: 15, quantity: 3, category: "Fruit" },
// ]);

// db.sales.aggregate([{ $match: { category: "Fruit" } }]);
// db.sales.aggregate([{ $project: { _id: 0, item: 1, price: 1 } }]);
// db.sales.aggregate([
//   {
//     $group: {
//       _id: "$category",
//       totalSales: { $sum: { $multiply: ["$price", "$quantity"] } },
//     },
//   },
// ]);
// db.sales.aggregate([
//   {
//     $group: {
//       _id: "$category",
//       totalSales: { $sum: { $multiply: ["$price", "$quantity"] } },
//     },
//   },
//   { $sort: { totalSales: -1 } },
// ]);
db.sales.aggregate([
  { $match: { category: "Fruit" } },
  {
    $group: {
      _id: null,
      totalFruitSales: { $sum: { $multiply: ["$price", "$quantity"] } },
    },
  },
]);
