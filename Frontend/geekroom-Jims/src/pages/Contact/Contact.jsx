import { useState } from 'react';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Connect With Us</h1>
        <p>Have questions about events, registration, or corporate collaborations? Drop us a message!</p>
      </div>

      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form-container">
          {submitted ? (
            <div className="success-message">
              <span className="success-icon">🎉</span>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out. A team member from GeekRoom JIMS will contact you shortly.</p>
              <button onClick={() => setSubmitted(false)} className="reset-btn">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Partnership, Registration query..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          )}
        </div>

        {/* Contact Cards Info */}
        <div className="contact-info-cards">
          <div className="info-card">
            <span className="info-icon">✉️</span>
            <div>
              <h3>General Inquiries</h3>
              <p>info@geekroomjims.in</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">📍</span>
            <div>
              <h3>Campus Location</h3>
              <p>JIMS Sector 5, Rohini, New Delhi, 110085</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">💬</span>
            <div>
              <h3>Discord Community</h3>
              <p>discord.gg/geekroom-jims</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
