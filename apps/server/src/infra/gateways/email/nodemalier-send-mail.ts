import {
  SendEmailData,
  SendMail,
} from "@/domain/contracts/gateways/email/send-mail";
import { Transporter, createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class NodemalierSendMail implements SendMail {
  private transporter: Transporter;
  constructor(
    transport?: SMTPTransport | SMTPTransport.Options | string,
    defaults?: SMTPTransport.Options,
  ) {
    this.transporter = createTransport(transport, defaults);
  }

  async send(data: SendEmailData): Promise<void> {
    await this.transporter.sendMail({
      from: {
        name: data.from.name,
        address: data.from.email,
      },
      to: data.to,
      subject: data.subject,
      html: data.body,
    });
  }
}
