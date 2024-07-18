// src/components/Footer.js

import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; 2024 Smart Financial Management System. All rights reserved.</p>
                <p>
                    <strong>Contact:</strong>
                    <a href="mailto:support@sfms.com">support@sfms.com</a> |
                    <a href="tel:+18001234567"> +1 (800) 123-4567</a>
                </p>
                <p>
                    <strong>Address:</strong> 123 Finance Street, Dallas, TX, 75001, USA
                </p>
                <div className="social-media">
                    <strong>Follow us:</strong>
                    <a href="https://www.facebook.com/sfms" target="_blank" rel="noopener noreferrer"> Facebook</a>,
                    <a href="https://www.twitter.com/sfms" target="_blank" rel="noopener noreferrer"> Twitter</a>,
                    <a href="https://www.linkedin.com/company/sfms" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
