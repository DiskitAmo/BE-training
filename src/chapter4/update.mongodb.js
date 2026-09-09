use("ecommerce");

// db.products.updateOne({ name: "Wireless Mouse" }, { $set: { price: 899 } });
//db.products.updateMany({ category: "Electronics" }, { $inc: { stock: 10 } });
//db.products.updateOne({ name: "Wireless Mouse" }, { $push: { tags: "new" } });
// db.contacts.deleteOne({ name: "Alice" })
// db.orders.deleteMany({ status: "Delivered" })
//db.products.createIndex({ name: 1 });
db.products.getIndexes();
