require("dotenv").config({path: "./sendgrid.env"});
const {onRequest} = require("firebase-functions/v2/https");
const sgMail = require("@sendgrid/mail");
const cors = require("cors")({origin: true});


sgMail.setApiKey(process.env.SENDGRID_API_KEY);


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


// Cloud Function to handle bulk email sending
exports.sendBulkFunction = onRequest({region: "australia-southeast1"},
    async (req, res) => {
      cors(req, res, async () => {
        // Allow only POST requests
        if (req.method !== "POST") {
          return res.status(405).send("Method Not Allowed");
        }

        const {emails} = req.body; // Expecting an array of user objects

        // Function to create the email message
        const createEmailMessage = (email) => ({
          to: email,
          from: "dieulinh268268@gmail.com", // Sender email
          subject: "New Review Submitted!",
          text: [
            `Another user just reviewed HealingCountry!`,
            `Do you want to visit our website to take a look?`,
            `Our website URL: https://aboriginal-health.vercel.app`,
          ].join("\n"),
          html: [
            `Another user just reviewed HealingCountry!<br>`,
            `<em>Do you want to take a look?</em><br>`,
            `Visit our website: <a href="https://aboriginal-health.vercel.app">https://aboriginal-health.vercel.app</a>`,
          ].join(""),
        });

        // Send emails concurrently
        await Promise.all(
            emails.map(async (user) => {
              const {email} = user; // Destructure the email from user object

              try {
                const msg = createEmailMessage(email);
                await sgMail.send(msg);
                console.log(`Email sent successfully to ${email}`);
              } catch (error) {
                console.log(`Failed to send email to ${email}: ${error}`);
              }
            }),
        );

        return res.status(200).send("All emails sent!");
      });
    });
