import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Footer from './Footer'; // Import Footer component
import '../styles/styles.css'; // Import your CSS file

const Features = () => {
    return (
        <div className="features">
            <div className="container section">
                <h2>Features</h2>
                <p>
                    Why Choose Our System?
                </p>
                <ul>
                    <li>Effortless Expense Management: Track and categorize your expenses with ease using our intuitive interface.</li>
                    <li>Savings Goals: Set your savings goals and monitor your progress to stay on track.</li>
                    <li>Investment Monitoring: Keep an eye on your investments and financial portfolios with real-time updates.</li>
                    <li>Secure and Reliable: Our platform employs state-of-the-art security measures to ensure your data is protected.</li>
                    <li>User-Friendly Interface: Our platform is designed with the user in mind, making it easy to navigate and use.</li>
                </ul>
            </div>
            <Link to="/" className="back-button">Back</Link> {/* Link to navigate back */}
            <Footer /> {/* Include Footer component */}
        </div>
    );
};

export default Features;
