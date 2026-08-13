const { BrevoClient } = require('@getbrevo/brevo');

let brevoClientInstance = null;

const getBrevoClient = () => {
    if (!brevoClientInstance) {
        brevoClientInstance = new BrevoClient({
            apiKey: process.env.Breavo_Api || '',
        });
    }
    return brevoClientInstance;
};

/**
 * Sends a contact email using Brevo
 * @param {string} name - The sender's name
 * @param {string} email - The sender's email address
 * @param {string} message - The message content
 */
const sendContactEmail = async (name, email, message) => {
    const brevo = getBrevoClient();

    try {
        const data = await brevo.transactionalEmails.sendTransacEmail({
            subject: `New Contact Form Submission from ${name}`,
            htmlContent: `
                <html>
                    <body>
                        <h2>New Message from Contact Form</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message}</p>
                    </body>
                </html>
            `,
            // The sender MUST be an email verified in your Brevo account!
            sender: { name: "GeekRoom Contact", email: process.env.email || "verified-sender@example.com" },
            // Set the visitor's email as the reply-to address
            replyTo: { name: name, email: email },
            // This is where you will receive the contact form emails
            to: [{ email: process.env.email || "admin@example.com", name: "Admin" }]
        });
        return data;
    } catch (error) {
        console.error("Error sending email via Brevo:", error);
        throw error;
    }
};

module.exports = {
    sendContactEmail
};
