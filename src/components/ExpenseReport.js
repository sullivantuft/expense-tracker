import React, { useState } from "react";
// Importing Pie chart component from react-chartjs-2
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

// Register chart components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

// Data for income vs spending chart
const incomeSpendingData = (expenses) => {
  const expenseData = expenses.reduce((acc, expense) => {
    if (expense.category === "Income") {
      acc.income = (acc.income || 0) + expense.amount;
    } else {
      acc.spending = (acc.spending || 0) + expense.amount;
    }
    return acc;
  }, {});

  //Labels and data for the Pie Chart
  return {
    labels: ["Income", "Spending"],
    datasets: [
      {
        label: "Income vs Spending",
        data: [expenseData.income || 0, expenseData.spending || 0],
        backgroundColor: ["#4CAF50", "#FF6384"],
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };
};

// Data for total spending by category
const generateTotalSpendingData = (expenses) => {
  const expenseCategoryData = expenses.reduce((acc, expense) => {
    if (expense.category !== "Income") {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    }
    return acc;
  }, {});
  //Labels and decoration for the expense report pie chart
  return {
    labels: Object.keys(expenseCategoryData),
    datasets: [
      {
        label: "Total Spending by Category",
        data: Object.values(expenseCategoryData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
          "#9966FF",
          "#FF5733",
          "#C70039",
          "#900C3F",
          "#581845",
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };
};

const ExpenseReport = ({ expenses }) => {
  // Group expenses by year/month
  const groupExpensesByMonth = (expenses) => {
    return expenses.reduce((acc, expense) => {
      const yearMonth = `${expense.timestamp.getFullYear()}-${
        expense.timestamp.getMonth() + 1
      }`;
      if (!acc[yearMonth]) acc[yearMonth] = [];
      acc[yearMonth].push(expense);
      return acc;
    }, {});
  };

  const [selectedMonth, setSelectedMonth] = useState("");
  const groupedExpenses = groupExpensesByMonth(expenses);

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  // Filter expenses based on selected month
  const filteredExpenses = selectedMonth
    ? groupedExpenses[selectedMonth] || []
    : expenses;

  const filteredIncomeSpendingData = incomeSpendingData(filteredExpenses);
  const filteredTotalSpendingData = generateTotalSpendingData(filteredExpenses);

  // Tooltip options to add $ symbol
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return "$" + tooltipItem.raw.toFixed(2);
          },
        },
      },
    },
  };

  return (
    <div>
      {/* Month selection buttons */}
      <div className="month-labels">
        {Object.keys(groupedExpenses).map((month) => (
          <button
            key={month}
            className={`month-label ${month === selectedMonth ? "selected" : ""}`}
            onClick={() => handleMonthClick(month)}
          >
            {/* Format the month name to display as "Month Year" */}
            {new Date(month).toLocaleString("default", { month: "long", year: "numeric" })}
          </button>
        ))}
      </div>
  
      {/* Expense Report - Displays a Pie chart of total spending */}
      <h2>Expense Report</h2>
      <Pie data={filteredTotalSpendingData} options={options} />
  
      {/* Income vs Spending Report - Displays another Pie chart for comparison */}
      <h2>Income vs Spending Report</h2>
      <Pie data={filteredIncomeSpendingData} options={options} />
    </div>
  );
};

export default ExpenseReport;
