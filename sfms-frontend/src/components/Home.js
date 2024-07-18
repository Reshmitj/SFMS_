// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <header className="hero">
                <img src="/financialImage.jpg" alt="Financial Management" className="hero-image" />
                <div className="hero-text">
                    <h1>Welcome to Smart Financial Management System</h1>
                    <p>Take control of your finances with our powerful and intuitive financial management platform.</p>
                    <Link to="/login" className="cta-button">Get Started Now</Link>
                </div>
            </header>

            <section className="features">
                <img src="/featuresImage.jpg" alt="Features" className="section-image" />
                <h2>Why Choose Our System?</h2>
                <ul>
                    <li>Effortlessly manage your expenses</li>
                    <li>Set and achieve your savings goals</li>
                    <li>Monitor investments and financial portfolios</li>
                    <li>Secure and reliable data protection</li>
                </ul>
            </section>

            <section className="testimonials">
                <img src="/userTestimonialImage.jpg" alt="User Testimonials" className="section-image" />
                <h2>What Users Are Saying</h2>
                <div className="testimonial">
                    <p>"Using this system has transformed how I manage my finances. It's user-friendly and effective!"</p>
                    <p>- Jane Smith, Financial Analyst</p>
                </div>
            </section>

            <footer>
                <nav>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/features">Features</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </nav>
                <p>&copy; 2024 Smart Financial Management System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
