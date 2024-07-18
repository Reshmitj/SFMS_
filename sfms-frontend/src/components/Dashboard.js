import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BudgetsChart from './BudgetsChart';
import MyPieChartComponent from './MyPieChartComponent';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Button, Box, Typography } from '@mui/material';
import './Dashboard.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthlyTotals, setMonthlyTotals] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    const loadBudgets = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/budgets');
            setBudgets(response.data);
        } catch (error) {
            console.error('Error loading budgets:', error);
        }
    }, []);

    const loadExpenses = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/expenses');
            const expensesData = response.data;
            setExpenses(expensesData);
            const uniqueCategories = [...new Set(expensesData.map(expense => expense.category))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error loading expenses:', error);
        }
    }, []);

    useEffect(() => {
        loadBudgets();
        loadExpenses();
    }, [loadBudgets, loadExpenses]);

    useEffect(() => {
        const calculateMonthlyTotals = () => {
            const totals = {};
            expenses.forEach(expense => {
                const monthYear = `${new Date(expense.date).getMonth() + 1}/${new Date(expense.date).getFullYear()}`;
                if (!totals[monthYear]) {
                    totals[monthYear] = 0;
                }
                totals[monthYear] += expense.amount;
            });
            const totalsArray = Object.keys(totals).map(key => ({
                monthYear: key,
                total: totals[key],
            }));
            setMonthlyTotals(totalsArray);
        };

        calculateMonthlyTotals();
    }, [expenses]);

    const previousYear = () => setYear(prev => prev - 1);
    const nextYear = () => setYear(prev => prev + 1);

    const handlePieClick = (label) => {
        setSelectedCategory(label);
    };

    const pieData = {
        labels: categories,
        datasets: [
            {
                data: categories.map(category => expenses.filter(expense => expense.category === category).reduce((total, expense) => total + expense.amount, 0)),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    const chartData = {
        labels: monthlyTotals.map(item => item.monthYear),
        datasets: [
            {
                label: 'Total Expenses',
                backgroundColor: 'rgba(255, 165, 0, 0.2)', // Light orange
                borderColor: 'rgba(255, 165, 0, 1)', // Orange
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 165, 0, 1)', // Orange
                data: monthlyTotals.map(item => item.total.toFixed(2)),
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total Expenses ($)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
            },
        },
    };

    const selectedExpenses = expenses.filter(expense => expense.category === selectedCategory);

    return (
        <div className="dashboard">
            <Typography variant="h4" gutterBottom>Dashboard - {year}</Typography>
            <div className="chart-table-container">
                <div className="chart-container">
                    <Typography variant="h6">Monthly Budgets</Typography>
                    <BudgetsChart data={budgets.filter(budget => new Date(budget.date).getFullYear() === year)} />
                </div>
                <div className="chart-container">
                    <Typography variant="h6">Expenses by Category</Typography>
                    <MyPieChartComponent data={pieData} onPieClick={handlePieClick} />
                </div>
            </div>
            <div className="chart-table-container">
                <div className="chart-container">
                    <Typography variant="h6">Total Expenses by Month</Typography>
                    <div style={{ height: '400px' }}>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
                {selectedCategory && (
                    <div className="table-container">
                        <Typography variant="h6" className="expenses-header">Expenses in {selectedCategory}</Typography>
                        <table className="expenses-table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedExpenses.map((expense, index) => (
                                    <tr key={index}>
                                        <td>{expense.description}</td>
                                        <td>${expense.amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" onClick={previousYear} disabled={year <= new Date().getFullYear() - 1}>
                    Previous Year
                </Button>
                <Button variant="contained" onClick={nextYear} disabled={year >= new Date().getFullYear()}>
                    Next Year
                </Button>
            </Box>
        </div>
    );
};

export default Dashboard;
