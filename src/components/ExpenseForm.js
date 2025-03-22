import React, { useState } from "react";

function ExpenseForm({ addExpense }) {
  // Declare state variables for category, amount, description, and charitable amount
  const [category, setCategory] = useState("Groceries");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [charitableAmount, setCharitableAmount] = useState("");

  // Function to handle category changes from the dropdown
  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // Update category state
  };

  // Function to handle amount changes, ensuring only numeric input
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, ""); // Remove non-numeric characters
    setAmount(value); // Update amount state
  };

  // Function to handle description input changes
  const handleDescriptonChange = (e) => {
    setDescription(e.target.value); // Update description state
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // If category is "Income", add both income and charitable giving data
    if (category === "Income") {
      addExpense({ category: "Income", amount });
      addExpense({ category: "Charitable Giving", amount: charitableAmount });

      // Reset form fields after submission
      setCategory("Groceries");
      setAmount("");
      setCharitableAmount("");
      setDescription("");
    }

    // If all necessary fields are filled, submit the expense data
    if (description && category && amount) {
      addExpense({
        description,
        category,
        amount: parseInt(amount), // Parse amount to an integer
        timestamp: new Date(), // Include timestamp of the expense
      });

      // Reset form fields after submission
      setCategory("Groceries");
      setAmount("");
      setDescription("");
    }
  };

  return (
    // Form to input expense data
    <form onSubmit={handleSubmit}>
      {/* Category dropdown menu for selecting expense category */}
      <label htmlFor="category">Category</label>
      <select id="category" value={category} onChange={handleCategoryChange}>
        <option value="Groceries">Groceries</option>
        <option value="Treats">Treats</option>
        <option value="Gas">Gas</option>
        <option value="Eating Out">Eating Out</option>
        <option value="Unnecessary">Unnecessary</option>
        <option value="Necessary">Necessary</option>
        <option value="Recurring Payments">Recurring Payments</option>
        <option value="Charitable Giving">Charitable Giving</option>
        <option value="Income">Income</option>
      </select>

      {/* Amount input field */}
      <label htmlFor="amount">Amount</label>
      <div className="amount-input-container">
        <span>$</span>
        <input
          type="number"
          id="amount"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange} // Update amount on input change
          required
        />
      </div>

      {/* Conditional input for charitable giving amount if category is "Income" */}
      {category === "Income" && (
        <div className="charitable-giving-container">
          <label>Charitable Giving Amount</label>
          <div className="amount-input-container">
            <span>$</span>
            <input
              type="number"
              placeholder="Amount"
              value={charitableAmount}
              onChange={(e) => setCharitableAmount(Number(e.target.value))} // Update charitableAmount state
            />
          </div>
        </div>
      )}

      {/* Description input field */}
      <label htmlFor="description">Description</label>
      <div className="description-input-container">
        <input
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={handleDescriptonChange} // Update description on input change
          required
        />
      </div>

      {/* Submit button to add the expense */}
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
