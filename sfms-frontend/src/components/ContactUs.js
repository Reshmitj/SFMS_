import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons
import Footer from './Footer'; // Import Footer component
import '../styles/styles.css'; // Import your CSS file

const ContactUs = () => {
    return (
        <div className="contact-us">
            <div className="container section">
                <h2>Contact Us</h2>
                <p>Get in Touch with Us</p>
                <ul className="contact-info">
                    <li>
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <span>Email:</span> <a href="mailto:support@sfms.com">support@sfms.com</a>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faPhone} className="icon" />
                        <span>Phone:</span> <a href="tel:+18001234567">+1 (800) 123-4567</a>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={['fab', 'facebook']} className="icon" />
                        <span>Facebook:</span> <a href="https://www.facebook.com/sfms" target="_blank" rel="noopener noreferrer">facebook.com/sfms</a>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={['fab', 'twitter']} className="icon" />
                        <span>Twitter:</span> <a href="https://www.twitter.com/sfms" target="_blank" rel="noopener noreferrer">twitter.com/sfms</a>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={['fab', 'linkedin']} className="icon" />
                        <span>LinkedIn:</span> <a href="https://www.linkedin.com/company/sfms" target="_blank" rel="noopener noreferrer">linkedin.com/company/sfms</a>
                    </li>
                </ul>
                <div className="table-container">
                    <h3>Follow us on social media:</h3>
                    <table className="social-media-table">
                        <thead>
                            <tr>
                                <th>Social Media</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Facebook</td>
                                <td><a href="https://www.facebook.com/sfms" target="_blank" rel="noopener noreferrer">facebook.com/sfms</a></td>
                            </tr>
                            <tr>
                                <td>Twitter</td>
                                <td><a href="https://www.twitter.com/sfms" target="_blank" rel="noopener noreferrer">twitter.com/sfms</a></td>
                            </tr>
                            <tr>
                                <td>LinkedIn</td>
                                <td><a href="https://www.linkedin.com/company/sfms" target="_blank" rel="noopener noreferrer">linkedin.com/company/sfms</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Link to="/" className="back-button">Back</Link> {/* Link to navigate back */}
            <Footer /> {/* Include Footer component */}
        </div>
    );
};

export default ContactUs;
