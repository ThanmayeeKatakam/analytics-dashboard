const express = require("express");
const router = express.Router();

const Sale = require("../models/Sale");

const {
  createSale,
  getSales,
  getSummary
} = require("../controllers/salesController");

router.post("/", createSale);
router.get("/", getSales);
router.get("/summary", getSummary);

router.post("/seed", async (req, res) => {
  try {
    await Sale.deleteMany({}); // Clear old data

    const categories = ["Electronics", "Clothing", "Furniture", "Books"];
    const statuses = ["Completed", "Pending", "Cancelled"];
    const products = [
      "Laptop", "Mobile", "TV", "Headphones",
      "T-Shirt", "Jeans", "Jacket",
      "Sofa", "Chair", "Table",
      "Notebook", "Novel", "Textbook"
    ];

    const fakeData = [];

    for (let i = 0; i < 100; i++) {

      const category = categories[Math.floor(Math.random() * categories.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const productName = products[Math.floor(Math.random() * products.length)];

      const quantity = Math.floor(Math.random() * 5) + 1;
      const price = Math.floor(Math.random() * 5000) + 500;

      const amount = price * quantity;

      const randomMonth = Math.floor(Math.random() * 12);
      const randomDay = Math.floor(Math.random() * 28) + 1;

      const randomDate = new Date(2024, randomMonth, randomDay);

      fakeData.push({
        productName,
        category,
        quantity,
        amount,
        status,
        date: randomDate
      });
    }

    await Sale.insertMany(fakeData);

    res.json({ message: "100 Fake Records Inserted Successfully 🚀" });

  } catch (error) {
    console.error("SEED ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;