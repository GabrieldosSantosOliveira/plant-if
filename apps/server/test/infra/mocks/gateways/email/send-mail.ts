import {
  SendEmailData,
  SendMail,
} from "@/domain/contracts/gateways/email/send-mail";

export class SendMailMock implements SendMail {
  public param: SendEmailData | null = null;
  async send(data: SendEmailData): Promise<void> {
    this.param = data;
  }
}
export const makeSendMailMock = () => {
  const sendMailMock = new SendMailMock();
  return { sendMailMock };
};
