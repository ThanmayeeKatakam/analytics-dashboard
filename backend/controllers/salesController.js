const Sale = require("../models/Sale");

// Create Sale
exports.createSale = async (req, res) => {
  try {
    const newSale = new Sale(req.body);
    const savedSale = await newSale.save();
    res.status(201).json(savedSale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Sales with filters
exports.getSales = async (req, res) => {
  try {
    const { category, status } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const sales = await Sale.find(filter);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Summary
exports.getSummary = async (req, res) => {
  try {

    const { startDate, endDate, category, status } = req.query;

    let matchFilter = {};

    if (startDate && endDate) {
      matchFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (category) matchFilter.category = category;
    if (status) matchFilter.status = status;

    const revenueByCategory = await Sale.aggregate([
      { $match: matchFilter },
      { $group: { _id: "$category", totalRevenue: { $sum: "$amount" } } }
    ]);

    const salesByStatus = await Sale.aggregate([
      { $match: matchFilter },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const monthlyRevenue = await Sale.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenue: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Total Revenue
    const totalRevenueResult = await Sale.aggregate([
    { $match: matchFilter },
    { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalRevenue = totalRevenueResult[0]?.total || 0;

    

    // Total Sales Count
    const totalSales = await Sale.countDocuments(matchFilter);

    const avgOrderValue =
       totalSales > 0 ? (totalRevenue / totalSales).toFixed(2) : 0;

    // Top 5 Products by Revenue
    const topProducts = await Sale.aggregate([
    { $match: matchFilter },   // ⚠️ THIS LINE IS CRITICAL
    {
        $group: {
        _id: "$productName",
        totalRevenue: { $sum: "$amount" }
        }
    },
    { $sort: { totalRevenue: -1 } },
    { $limit: 5 }
    ]);

    res.json({
        totalRevenue,
        totalSales,
        avgOrderValue,
        revenueByCategory,
        salesByStatus,
        monthlyRevenue,
        topProducts
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};