import React from "react";

function ExpenseList({ expenses }) {
    return (
        <div>
            <h2>Expense List</h2>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        {expense.description} - {expense.category} - ${expense.amount} on{" "}
                        {expense.timestamp.toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExpenseList;
