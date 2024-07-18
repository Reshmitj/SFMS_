import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Footer from './Footer'; // Import Footer component
import '../styles/styles.css'; // Import your CSS file

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="container section">
                <h2>About Us</h2>
                <p>
                    Welcome to Smart Financial Management System (SFMS), your trusted partner in managing your finances efficiently. At SFMS, we are committed to providing top-notch financial management tools to help you take control of your financial future.
                </p>
                <p>
                    Our mission is to offer a powerful and intuitive platform that simplifies financial management for individuals and businesses alike. With our innovative solutions, you can effortlessly manage your expenses, set and achieve your savings goals, and monitor your investments and financial portfolios with ease.
                </p>
                <p>
                    Founded in 2023, SFMS has quickly become a leading player in the financial management sector, thanks to our dedicated team of experts and our unwavering commitment to customer satisfaction.
                </p>
            </div>
            <Link to="/" className="back-button">Back</Link> {/* Link to navigate back */}
            <Footer /> {/* Include Footer component */}
        </div>
    );
};

export default AboutUs;
