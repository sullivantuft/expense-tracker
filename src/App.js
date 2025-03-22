import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseReport from "./components/ExpenseReport"; // New page for expense charts



function App() {
    const [expenses, setExpenses] = useState([]); // Expense state

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]); // Add new expense
    };

    return (
        <Router>
            <div className="App">
                {/* Navigation Bar */}
                <nav>
                    <ul>
                        <li><Link to="/">Add Expense</Link></li>
                        <li><Link to="/report">Expense Report</Link></li>
                    </ul>
                </nav>

                {/* Page Routing */}
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <>
                                <h1>Add Expense</h1>
                                <ExpenseForm addExpense={addExpense} />
                                
                            </>
                        } 
                    />
                    <Route 
                        path="/report" 
                        element={<ExpenseReport expenses={expenses} />} 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
