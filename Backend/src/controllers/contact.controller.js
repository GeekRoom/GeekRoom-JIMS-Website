const { sendContactEmail } = require('../service/brevo.service');

const submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        // Send the email using the Brevo service
        await sendContactEmail(name, email, message);

        return res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact Form Error:', error);
        return res.status(500).json({ error: 'Failed to send message, please try again later' });
    }
};

module.exports = {
    submitContactForm
};
