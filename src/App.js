import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm"; // Import the ExpenseForm component
//Function is responsible for building everything within the app
function App() {
    //Manages state to store the list of expenses
    const [expenses, setExpenses] = useState([]); //Array destructuring
    
    //This function is responsible for adding a new expense.
    //It copies the existing list and appends the new expense.
    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    return(
        <div className="App">
        <h1>Expense Tracker</h1>
        {/* Renders the ExpenseForm component, passes in addExpense function as a prop*/}
        <ExpenseForm addExpense={addExpense} />

        {/* Displays the list of expenses*/}
        <ul>
            {expenses.map((expense, index) => (
                    <li key={index}>
                        {expense.timestamp.toString()} - ${expense.amount} - {expense.category} - {expense.description}
                    </li>
            ))}
        </ul>

        </div>
    )
}

export default App;
