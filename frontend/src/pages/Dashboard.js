import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const token = localStorage.getItem("token");

// const res = await axios.get("http://localhost:5000/api/sales/summary", {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

let query = `${process.env.REACT_APP_API_URL}/api/sales/summary?`; // instead of localhost
const res = await axios.get(query, {
  headers: {
    Authorization: `Bearer ${token}`, // send the JWT
  },
});

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  // ================= FETCH =================

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // let query = "http://localhost:5000/api/sales/summary?";
      let query = `${process.env.REACT_APP_API_URL}/api/sales/summary?`;

      if (startDate && endDate)
        query += `startDate=${startDate}&endDate=${endDate}&`;
      if (category) query += `category=${category}&`;
      if (status) query += `status=${status}&`;

      const res = await axios.get(query);
      setSummary(res.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, category, status]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: "easeInOutQuart",
    },
  };

  if (error) return <h2 className="center error">{error}</h2>;

  // ================= CHART DATA =================

  const revenueByCategoryData = summary && {
    labels: summary.revenueByCategory.map((i) => i._id),
    datasets: [{
      label: "Revenue",
      data: summary.revenueByCategory.map((i) => i.totalRevenue),
      backgroundColor: "#4CAF50",
    }],
  };

  const salesByStatusData = summary && {
    labels: summary.salesByStatus.map((i) => i._id),
    datasets: [{
      data: summary.salesByStatus.map((i) => i.count),
      backgroundColor: ["#2196F3", "#FFC107", "#F44336"],
    }],
  };

  const monthlyRevenueData = summary && {
    labels: summary.monthlyRevenue.map((i) => `Month ${i._id}`),
    datasets: [{
      label: "Monthly Revenue",
      data: summary.monthlyRevenue.map((i) => i.totalRevenue),
      borderColor: "#673AB7",
      backgroundColor: "rgba(103,58,183,0.2)",
      fill: true,
    }],
  };

  const topProductsData = summary && {
    labels: summary.topProducts?.map((i) => i._id),
    datasets: [{
      data: summary.topProducts?.map((i) => i.totalRevenue),
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4CAF50",
        "#9C27B0",
      ],
    }],
  };

  const revenueDistributionData = summary && {
    labels: summary.revenueByCategory.map((i) => i._id),
    datasets: [{
      data: summary.revenueByCategory.map((i) => i.totalRevenue),
      backgroundColor: [
        "#FF9800",
        "#03A9F4",
        "#8BC34A",
        "#E91E63",
      ],
    }],
  };

  return (
    <>
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="logo-section">
          <div className="logo-circle">AD</div>
          <div>
            <h1>Analytics Dashboard</h1>
            <p>Sales Performance Overview</p>
          </div>
          
        </div>
        <button className="logout-btn" onClick={handleLogout}>
  🚪 Logout
</button>
      </div>
      

      <div className="dashboard-container">

        {/* FILTERS */}
        <div className="filter-container">

          <div className="filter-group">
            <label><b>📅 Start Date</b></label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label><b>📅 End Date</b></label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label><b>📦 Category</b></label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Electronics">⚡ Electronics</option>
              <option value="Clothing">👕 Clothing</option>
              <option value="Furniture">🛋 Furniture</option>
              <option value="Books">📚 Books</option>
            </select>
          </div>

          <div className="filter-group">
            <label><b>📊 Status</b></label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Completed">✅ Completed</option>
              <option value="Pending">⏳ Pending</option>
              <option value="Cancelled">❌ Cancelled</option>
            </select>
          </div>

        </div>

        {/* LOADER */}
        {loading && (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        )}

        {/* CONTENT */}
        {!loading && summary && (
          <>
            {/* SUMMARY CARDS */}
            <div className="card-grid">
              <div className="summary-card">
                <h4>Total Revenue</h4>
                <h2>₹ {summary.totalRevenue}</h2>
              </div>

              <div className="summary-card">
                <h4>Total Sales</h4>
                <h2>{summary.totalSales}</h2>
              </div>

              <div className="summary-card">
                <h4>Categories</h4>
                <h2>{summary.revenueByCategory.length}</h2>
              </div>

              <div className="summary-card">
                <h4>Avg Order Value</h4>
                <h2>₹ {summary.avgOrderValue}</h2>
              </div>
            </div>

            {/* CHARTS */}
            <div className="chart-grid">

              <div className="chart-card">
                <h3>Revenue By Category</h3>
                <div className="chart-wrapper">
                  <Bar data={revenueByCategoryData} options={chartOptions} />
                </div>
              </div>

              <div className="chart-card">
                <h3>Sales By Status</h3>
                <div className="chart-wrapper">
                  <Pie data={salesByStatusData} options={chartOptions} />
                </div>
              </div>

              <div className="chart-card">
                <h3>Monthly Revenue</h3>
                <div className="chart-wrapper">
                  <Line data={monthlyRevenueData} options={chartOptions} />
                </div>
              </div>

              <div className="chart-card">
                <h3>Top 5 Products {category && `in ${category}`}</h3>
                <div className="chart-wrapper">
                  <Doughnut data={topProductsData} options={chartOptions} />
                </div>
              </div>

              <div className="chart-card full-width">
                <h3>Revenue Distribution</h3>
                <div className="chart-wrapper">
                  <Pie data={revenueDistributionData} options={chartOptions} />
                </div>
              </div>

            </div>
          </>
        )}

      </div>
    </>
  );
};

export default Dashboard;