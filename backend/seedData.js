const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Sale = require("./models/Sale");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected for Seeding"))
  .catch(err => console.log("❌ DB Connection Failed", err));

const categoryProducts = {
  Electronics: [
    { name: "Laptop", basePrice: 60000 },
    { name: "Mobile", basePrice: 25000 },
    { name: "Tablet", basePrice: 30000 },
    { name: "Headphones", basePrice: 3000 },
    { name: "Camera", basePrice: 45000 }
  ],
  Clothing: [
    { name: "Shirt", basePrice: 1200 },
    { name: "Jeans", basePrice: 2500 },
    { name: "Jacket", basePrice: 4000 },
    { name: "T-shirt", basePrice: 800 },
    { name: "Sweater", basePrice: 2000 }
  ],
  Furniture: [
    { name: "Sofa", basePrice: 35000 },
    { name: "Table", basePrice: 15000 },
    { name: "Chair", basePrice: 5000 },
    { name: "Bed", basePrice: 40000 },
    { name: "Wardrobe", basePrice: 30000 }
  ],
  Books: [
    { name: "Novel", basePrice: 500 },
    { name: "Textbook", basePrice: 1200 },
    { name: "Notebook", basePrice: 100 },
    { name: "Magazine", basePrice: 300 },
    { name: "Comics", basePrice: 400 }
  ]
};

const statuses = ["Pending", "Completed", "Cancelled"];

const generateRandomDate = () => {
  const start = new Date(2024, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const seedData = async () => {
  try {
    await Sale.deleteMany({});
    console.log("🗑 Old data cleared");

    const categories = Object.keys(categoryProducts);
    const salesData = [];

    for (let i = 0; i < 100; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];

      const productObj =
        categoryProducts[category][
          Math.floor(Math.random() * categoryProducts[category].length)
        ];

      const quantity = Math.floor(Math.random() * 5) + 1;

      const amount = productObj.basePrice * quantity;

      const status = statuses[Math.floor(Math.random() * statuses.length)];

      salesData.push({
        productName: productObj.name,
        category,
        quantity,
        amount,
        status,
        createdAt: generateRandomDate()
      });
    }

    await Sale.insertMany(salesData);

    console.log("🎉 100 Professional Sales Records Inserted!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding Failed:", error);
    process.exit(1);
  }
};

seedData();