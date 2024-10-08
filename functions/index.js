const {onRequest} = require("firebase-functions/v2/https");
const sgMail = require("@sendgrid/mail");
const cors = require("cors")({origin: true});
const functions = require("firebase-functions");

const sendgridApiKey = functions.config().sendgrid.key;

sgMail.setApiKey(sendgridApiKey);

const sendEmail = async (email, comment, rating) => {
  const msg = {
    to: email,
    from: "dieulinh268268@gmail.com",
    subject: "Thank You for Your Feedback!",
    text: [
      `Thank you for your rating for HealingCountry: ${rating} stars!`,
      `Your comment: "${comment}"`,
      `We truly appreciate your feedback and support!`,
    ].join("\n"),
    html: [
      `Thank you for your rating for HealingCountry: ${rating} stars!<br>`,
      `<strong>Your comment:</strong> "${comment}"<br>`,
      `<br>`,
      `<em>We truly appreciate your feedback and support!</em>`,
    ].join(""),
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.response.body.errors);
    throw new Error("Failed to send email.");
  }
};


exports.sendEmailFunction = onRequest({region: "australia-southeast1"},
    async (req, res) => {
      cors(req, res, async () => {
      // Allow only POST requests
        if (req.method !== "POST") {
          return res.status(405).send("Method Not Allowed");
        }

        const {email, comment, rating} = req.body;

        // Basic validation
        if (!email || !comment || !rating) {
          return res.status(400).send("Missing email, comment, or rating.");
        }

        try {
          await sendEmail(email, comment, rating);
          return res.status(200).send("Email sent successfully!");
        } catch (error) {
          console.error("Error sending email:", error);
          return res.status(500).send("Failed to send email.");
        }
      });
    },
);
