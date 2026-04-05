const twilio = require("twilio");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body || "{}");

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      body: `🔥 New Tattoo Request

Name: ${data.name || "N/A"}
Email: ${data.email || "N/A"}
Phone: ${data.phone || "N/A"}
Budget: ${data.budget || "N/A"}
Timeline: ${data.timeline || "N/A"}
Placement: ${data.placement || "N/A"}
Instagram: ${data.instagram || "N/A"}

Idea:
${data.idea || "N/A"}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.OWNER_PHONE_NUMBER
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "SMS sent successfully" })
    };
  } catch (error) {
    console.error("Error sending SMS:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};