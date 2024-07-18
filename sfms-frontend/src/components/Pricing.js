import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Footer from './Footer'; // Import Footer component
import '../styles/styles.css'; // Import your CSS file

const Pricing = () => {
    return (
        <div className="pricing">
            <div className="container section">
                <h2>Pricing</h2>
                <p>
                    Our Pricing Plans
                </p>
                <ol>
                    <li>
                        <strong>Basic Plan - $9.99/month</strong>
                        <ul>
                            <li>Access to all basic features</li>
                            <li>Expense tracking</li>
                            <li>Savings goal management</li>
                            <li>Basic support</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Premium Plan - $19.99/month</strong>
                        <ul>
                            <li>All features of the Basic Plan</li>
                            <li>Investment monitoring</li>
                            <li>Advanced analytics and reports</li>
                            <li>Priority support</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Enterprise Plan - Contact Us for Pricing</strong>
                        <ul>
                            <li>Customized solutions for large businesses</li>
                            <li>Dedicated account manager</li>
                            <li>Full access to all features</li>
                            <li>24/7 premium support</li>
                        </ul>
                    </li>
                </ol>
            </div>
            <Link to="/" className="back-button">Back</Link> {/* Link to navigate back */}
            <Footer /> {/* Include Footer component */}
        </div>
    );
};

export default Pricing;
