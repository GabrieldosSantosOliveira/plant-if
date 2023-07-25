/* eslint-disable import/first */
const mockSendMail = jest.fn()
jest.mock('nodemailer', () => {
  return {
    createTransport: () => ({
      sendMail: mockSendMail,
    }),
  }
})
import { NodemalierSendMail } from '@/infra/gateways/email/nodemalier-send-mail'

const makeSut = () => {
  const sut = new NodemalierSendMail()
  return { sut }
}
const sendMailRequestMock = {
  body: 'any_body',
  from: {
    email: 'any_mail',
    name: 'any_name',
  },
  subject: 'any_subject',
  to: 'any_mail',
}
describe('NodemailerSendMail', () => {
  afterEach(() => {
    mockSendMail.mockClear()
  })
  it('should call nodemailer sendMail with correct params', async () => {
    const { sut } = makeSut()

    await sut.send(sendMailRequestMock)
    expect(mockSendMail).toHaveBeenCalledWith({
      from: {
        name: sendMailRequestMock.from.name,
        address: sendMailRequestMock.from.email,
      },
      to: sendMailRequestMock.to,
      subject: sendMailRequestMock.subject,
      html: sendMailRequestMock.body,
    })
  })
  it('should throw if nodemailer sendMail throw', async () => {
    const { sut } = makeSut()
    mockSendMail.mockImplementation(() => {
      throw new Error()
    })
    await expect(sut.send(sendMailRequestMock)).rejects.toThrow()
  })
})
