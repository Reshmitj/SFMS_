// src/components/Expenses.js

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, TextField, Button, Box, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './Expenses.css';

function Expenses() {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [totalByMonth, setTotalByMonth] = useState({});

    // Predefined expense categories
    const categories = ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Other'];

    const loadExpenses = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/expenses');
            setExpenses(response.data);
            calculateTotalByMonth(response.data);
        } catch (error) {
            console.error('Error loading expenses:', error);
        }
    }, []);

    useEffect(() => {
        loadExpenses();
    }, [loadExpenses]);

    const calculateTotalByMonth = (expenses) => {
        const totalByMonth = {};
        expenses.forEach(expense => {
            const monthYear = expense.date.substring(0, 7); // Assuming date format is YYYY-MM
            if (totalByMonth[monthYear]) {
                totalByMonth[monthYear] += expense.amount;
            } else {
                totalByMonth[monthYear] = expense.amount;
            }
        });
        setTotalByMonth(totalByMonth);
    };

    const addExpense = async (e) => {
        e.preventDefault();
        if (description && amount && category && date) {
            const newExpense = { description, amount: parseFloat(amount), category, date };
            try {
                await axios.post('http://localhost:8080/api/expenses', newExpense);
                setDescription('');
                setAmount('');
                setCategory('');
                setDate('');
                loadExpenses();
            } catch (error) {
                console.error('Error adding expense:', error);
            }
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/expenses/${id}`);
            loadExpenses();
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    return (
        <Card>
            <CardHeader title="Expenses" />
            <CardContent>
              
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenses.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell>{expense.description}</TableCell>
                                    <TableCell>${expense.amount.toFixed(2)}</TableCell>
                                    <TableCell>{expense.category}</TableCell>
                                    <TableCell>{expense.date}</TableCell>
                                    <TableCell>
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteExpense(expense.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box component="form" display="flex" gap={2} onSubmit={addExpense} className="form-container">
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field"
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="input-field"
                    />
                    <Select
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="input-field"
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                    </Select>
                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input-field"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button variant="contained" color="primary" type="submit" className="add-button">Add Expense</Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default Expenses;
