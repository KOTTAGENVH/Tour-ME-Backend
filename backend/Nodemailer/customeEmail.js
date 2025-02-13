import nodemailer from "nodemailer";

export const customEmail = async (email, subject, body) => {
  console.log("sending email");
  try {
    const senderEmail = process.env.EMAIL;
    const password = process.env.PASS;

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: senderEmail,
        pass: password,
      },
    });

    let mailDetails = {
      from: senderEmail,
      to: email,
      subject: subject,
      text: body,
    };

    await mailTransporter.sendMail(mailDetails);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending email:", error?.message);
    return false;
  }
};
