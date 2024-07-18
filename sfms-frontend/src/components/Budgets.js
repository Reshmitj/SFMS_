// src/components/Budgets.js

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, TextField, Button, Box, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './Budgets.css';

function Budgets() {
    const [budgets, setBudgets] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const loadBudgets = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/budgets');
            setBudgets(response.data);
        } catch (error) {
            console.error('Error loading budgets:', error);
        }
    }, []);

    useEffect(() => {
        loadBudgets();
    }, [loadBudgets]);

    const addBudget = async (e) => {
        e.preventDefault();
        if (name && amount && date) {
            const newBudget = { name, amount: parseFloat(amount), date };
            try {
                await axios.post('http://localhost:8080/api/budgets', newBudget);
                setName('');
                setAmount('');
                setDate('');
                loadBudgets();
            } catch (error) {
                console.error('Error adding budget:', error);
            }
        }
    };

    const deleteBudget = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/budgets/${id}`);
            loadBudgets();
        } catch (error) {
            console.error('Error deleting budget:', error);
        }
    };

    return (
        <Card>
            <CardHeader title="Budgets" />
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {budgets.map((budget) => (
                                <TableRow key={budget.id}>
                                    <TableCell>{budget.name}</TableCell>
                                    <TableCell>${budget.amount.toFixed(2)}</TableCell>
                                    <TableCell>{budget.date}</TableCell>
                                    <TableCell>
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteBudget(budget.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box component="form" display="flex" gap={2} onSubmit={addBudget} className="form-container">
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="input-field"
                    />
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
                    <Button variant="contained" color="primary" type="submit" className="add-button">Add Budget</Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default Budgets;
