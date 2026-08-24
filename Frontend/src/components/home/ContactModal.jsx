import React from 'react';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent to Geek Room core team!');
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-box glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark" />
        </button>

        <h2 className="modal-title text-gradient-blue">
          <i className="fa-solid fa-paper-plane" /> Contact Geek Room JIMS
        </h2>
        <p style={{ color: 'var(--text-muted)', margin: '10px 0 20px 0' }}>
          Have a query or sponsorship proposal? Drop us a message!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-input" placeholder="John Doe" required />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="yourname@gmail.com" required />
          </div>

          <div className="form-group">
            <label className="form-label">Subject</label>
            <input type="text" className="form-input" placeholder="Sponsorship / Membership Inquiry" required />
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-textarea" rows="4" placeholder="Write your message here..." required />
          </div>

          <button type="submit" className="btn-primary-neon" style={{ width: '100%', justifyContent: 'center' }}>
            Send Message <i className="fa-solid fa-paper-plane" />
          </button>
        </form>
      </div>
    </div>
  );
}
