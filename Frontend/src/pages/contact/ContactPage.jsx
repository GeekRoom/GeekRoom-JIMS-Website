import { useState } from "react";
import { Clock, Mail, MapPin, Send } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { api } from "../../utils/api";
import "../../styles/contact.css";

const contactItems = [
  {
    icon: MapPin,
    title: "Address",
    text: "Jagan Institute of Management Studies, Rohini Sector-5, New Delhi",
    link: "https://www.google.com/maps/search/?api=1&query=Jagan+Institute+of+Management+Studies,+Rohini+Sector-5,+New+Delhi"
  },
  {
    icon: Mail,
    title: "Email",
    text: "geekroomjims@jimsindia.org",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=geekroomjims@jimsindia.org"
  }
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: ""
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });
    try {
      await api.post("/contact/submit", formData);
      setStatus({ loading: false, success: true, error: "" });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch {
      setStatus({ loading: false, success: false, error: "Failed to send message. Please try again later." });
    }
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 0.8;
    const rotateY = ((x - centerX) / centerX) * 0.8;
    card.style.transform = `perspective(1200px) translateY(-3px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "perspective(1200px) translateY(0px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <main className="contact-page">
      <div className="layout-shell pt-32 sm:pt-36">
        <section className="hero-panel" aria-labelledby="page-title">
          <h1 className="hero-title hero-title-premium font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase" id="page-title">
            CONTACT <span className="text-gradient-orange">US</span>
          </h1>
        </section>

        <section
          className="contact-panel glass-card"
          id="contact"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <form className="form-card" onSubmit={handleSubmit}>
            <h2>Get In Touch</h2>

            {status.success && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {status.error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {status.error}
              </div>
            )}

            <div className="field-grid">
              <label>
                Name
                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
              </label>

              <label>
                Email
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
              </label>

              <label>
                Subject
                <input required type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" />
              </label>

              <label>
                Message
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us about your idea, query, or collaboration."
                />
              </label>
            </div>

            <button type="submit" disabled={status.loading} className="primary-button disabled:opacity-50 disabled:cursor-not-allowed">
              <Send className="button-icon" aria-hidden="true" />
              {status.loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          <aside className="contact-details" aria-label="Contact information">
            {contactItems.map(({ icon: Icon, title, text, link }) => (
              <article className="contact-row" key={title}>
                <span className="icon-box">
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--orange-primary)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>
                    <p style={{ margin: 0 }}>{text}</p>
                  </a>
                </div>
              </article>
            ))}

            <div className="social-card">
              <div>
                <h3>Follow Geek Room</h3>
                <p>Updates, events, workshops, and student tech moments.</p>
              </div>
              <div className="social-links">
                <a href="https://www.instagram.com/geekroom_jims?igsi=Z3o2c2lycXE1NGQy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="instagram">
                  <FaInstagram aria-hidden="true" />
                </a>
                <a href="https://youtube.com/@geekfeed-grj?si=ZAHaBE9uvgMGVkLM" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="youtube">
                  <FaYoutube aria-hidden="true" />
                </a>
                <a href="https://www.linkedin.com/company/geekroom-jims/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="linkedin">
                  <FaLinkedinIn aria-hidden="true" />
                </a>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default ContactPage;
