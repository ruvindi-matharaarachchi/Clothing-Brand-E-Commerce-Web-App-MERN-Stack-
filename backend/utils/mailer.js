const nodemailer = require('nodemailer');

// Create reusable transporter
let transporter = null;

const createTransporter = () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
};

// Send order confirmation email
const sendOrderConfirmationEmail = async ({ to, userName, order }) => {
  try {
    const transporter = createTransporter();

    // Build HTML body
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f8f9fa; }
          .order-info { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
          .items-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          .items-table th, .items-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          .items-table th { background-color: #f8f9fa; }
          .total { font-size: 18px; font-weight: bold; color: #007bff; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
            <p>Thank you for your purchase!</p>
          </div>
          
          <div class="content">
            <div class="order-info">
              <h2>Order Details</h2>
              <p><strong>Order ID:</strong> #${order.id}</p>
              <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Customer:</strong> ${userName}</p>
            </div>

            <h3>Items Ordered</h3>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.size}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${item.lineTotal.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="order-info">
              <p class="total">Total: $${order.totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for shopping with us!</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Build text body
    const textBody = `
Order Confirmation - #${order.id}

Dear ${userName},

Thank you for your purchase! Here are your order details:

Order ID: #${order.id}
Order Date: ${new Date(order.date).toLocaleDateString()}

Items Ordered:
${order.items.map(item => 
  `- ${item.name} (Size: ${item.size}) x${item.quantity} - $${item.price.toFixed(2)} each = $${item.lineTotal.toFixed(2)}`
).join('\n')}

Total: $${order.totalPrice.toFixed(2)}

Thank you for shopping with us!
If you have any questions, please contact our support team.
    `;

    // Send email
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: to,
      subject: `Order Confirmation – #${order.id}`,
      text: textBody,
      html: htmlBody
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

module.exports = {
  sendOrderConfirmationEmail
};
