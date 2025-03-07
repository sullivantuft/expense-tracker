import React, { useState } from 'react';
//This is a function component that returns JSX.
function ExpenseForm({addExpense}){

    const [category, setCategory] = useState("Groceries");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    //This function is responsible for setting the category to the appropriate value.
    const handleCategoryChange = (e) =>{
        setCategory(e.target.value);

    }

    //This function is responsible for ensuring numeric input and setting the amount to the correct value/
    const handleAmountChange = (e) =>{
        const value = e.target.value.replace(/[^\d.]/g, ""); //ensures only numeric characters
        setAmount(value);
    }

    //This function sets description to the correct value.
    const handleDescriptonChange = (e) =>{
        setDescription(e.target.value)
    }

    //This function is responsible for handling the submit portion of the submit button.
    const handleSubmit = (e) => {
        e.preventDefault();

        if(description && category && amount) {
            addExpense({
                description, 
                category, 
                amount: parseInt(amount),
                timestamp: new Date()
            });
            setCategory("Groceries");
            setAmount("");
            setDescription("");
        }
    }

    return(

    //Category drop down menu
    <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <select
        id = "category"
        value = {category}
        onChange = {handleCategoryChange}
        >
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

        {/*Amount input field*/}
        
        <label htmlFor="amount">Amount</label>
        <div className = "amount-input-container">
            <span>$</span>
            <input
                type="text"
                id="amount"
                placeholder="Amount"
                value={amount}
                onChange={handleAmountChange}
                required
            />
        </div>

        {/*Description input field */}

        <label htmlFor="description">Description</label>
        <div className = "description-input-container">
            <input
                type="text"
                id="description"
                placeholder="Description"
                value={description}
                onChange={handleDescriptonChange}
                required
            />
        </div>

        {/*Submit button */}
        <button type="submit">Add Expense</button>

    </form>
    )
}

export default ExpenseForm;