import nodemailer from "nodemailer";
import config from "../config";
import { TCustomer } from "../modules/customer/customer.interface";
import { TProvider } from "../modules/provider/provider.interface";
import { TService } from "../modules/service/service.interface";
import { formatDate, formatTime } from "./date.utils.";

export const sendBookingEmail = async (
  customer: TCustomer,
  provider: TProvider,
  bookingSchedule: {
    date: string;
    startTime: string;
    endTime: string;
  },
  service: TService,
) => {
  const transporter = nodemailer.createTransport({
    host: config.email_host,
    port: Number(config.email_port),
    secure: config.NODE_ENV === "production", // `true` for port 465, `false` for all other ports
    auth: {
      user: config.email_user,
      pass: config.email_password,
    },
  });

  // Email to Customer
  const customerMailOptions = {
    from: config.email_from,
    to: customer.email,
    subject: "Booking Confirmation", // Subject line for Customer
    html: `
          <p>Hello Customer,</p>
          <p>Your booking has been confirmed.</p>
          <p>Please find the details below:</p>
          <p>Booking Details:</p>
          <ul>
            <li><strong>Service Name:</strong> ${service.name}</li>
            <li><strong>Booking Date:</strong> ${formatDate(bookingSchedule.date)} </li>
            <li><strong>Booking Time:</strong> ${formatTime(bookingSchedule.startTime)} - ${formatTime(bookingSchedule.endTime)}</li>
            <li><strong>Provider Name:</strong> ${provider.name}</li>
            <li><strong>Provider Phone:</strong> ${provider.phone}</li>
          </ul>
          <p>Thank you for choosing our service.</p>
        `,
  };

  // Email to Provider
  const providerMailOptions = {
    from: config.email_from,
    to: provider.email,
    subject: "New Booking", // Subject line for Provider
    html: `
          <p>Hello ${provider.name}</p>
          <p>You have a new booking request.</p>
          <p>Please find the details below:</p>
          <p>Booking Details:</p>
          <ul>
            <li><strong>Service Name:</strong> ${service.name}</li>
            <li><strong>Customer Name:</strong> ${customer.name}</li>
            <li><strong>Customer Email:</strong> ${customer.email}</li>
            <li><strong>Customer Phone:</strong> ${customer.phone}</li>
            <li><strong>Booking Date:</strong> ${formatDate(bookingSchedule.date)} </li>
            <li><strong>Booking Time:</strong> ${formatTime(bookingSchedule.startTime)} - ${formatTime(bookingSchedule.endTime)}</li>
            <!-- Add more booking details as needed -->
          </ul>
        `,
  };

  try {
    // Send emails to both customer and provider
    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(providerMailOptions);

    console.log("Booking confirmation emails sent successfully");
  } catch (error) {
    console.error("Error sending booking confirmation emails:", error);
    throw new Error("Failed to send booking confirmation emails");
  }
};
