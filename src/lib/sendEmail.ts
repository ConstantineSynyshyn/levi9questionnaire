import nodemailer from "nodemailer";

interface MailConfigType {
  from: string;
  to: string;
  subject: string;
  html: string;
}
const initialMailDataConfig: Pick<MailConfigType, "from"> = {
  from: process.env.EMAIL_FROM!,
};

const smtpUrl = process.env.EMAIL_SERVER;

export const sendEmail = async (
  server: string,
  email: string,
  from: string,
  title: string,
  message: string
) => {
  const transporter = nodemailer.createTransport(server, { secure: true });
  const config = {
    from,
    to: email,
    subject: title,
    html: message,
  };
  const result = await transporter.sendMail(config);
  return result;
};

export const send = async (
  email: string,
  title: string,
  message: string
) => {
  try {
    const transporter = await nodemailer.createTransport(smtpUrl, { secure: false });
    const config = {
      ...initialMailDataConfig,
      to: email,
      subject: title,
      html: message,
    };
    const result = await transporter.sendMail(config);
    return Promise.resolve(result);
  } catch {
    return Promise.resolve(false);
  }
};
