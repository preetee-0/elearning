const nodemailer = require("nodemailer");

const sendContactMessage = async (req, res) => {
    try {
        const { name, email, mobile, message } = req.body;

        // Validation
        if (!name || !email || !mobile || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

        // Create the transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email content
        const mailOptions = {
            from: `"E-Learning Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.CONTACT_RECEIVER || process.env.EMAIL_USER,
            replyTo: email,     // so you can hit "Reply" and go to the user
            subject: `New Contact Message from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #06a7d9;">New Contact Form Submission</h2>

                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px; font-weight: bold; width: 120px;">Name:</td>
                            <td style="padding: 8px;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold;">Email:</td>
                            <td style="padding: 8px;">
                                <a href="mailto:${email}">${email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold;">Mobile:</td>
                            <td style="padding: 8px;">${mobile}</td>
                        </tr>
                    </table>

                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

                    <h3 style="color: #333;">Message:</h3>
                    <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #06a7d9; line-height: 1.6;">
                        ${message.replace(/\n/g, "<br>")}
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });
    } catch (error) {
        console.error("Contact email error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send message. Please try again later."
        });
    }
};

module.exports = { sendContactMessage };