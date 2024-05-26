import { LoadGoogleUserImpl } from "@/infra/gateways/google/load-google-user-impl";
import { faker } from "@faker-js/faker";

import { makeHttpClientMock } from "../../mocks/http/make-http-client-mock";

const makeSut = () => {
  const { httpClientMock } = makeHttpClientMock();
  const sut = new LoadGoogleUserImpl(httpClientMock);
  return { sut, httpClientMock };
};
describe("LoadGoogleUserImpl", () => {
  it("should ", async () => {
    const { sut, httpClientMock } = makeSut();
    httpClientMock.responseGet = {
      data: {
        id: "any_id",
        email: "any_email",
        email_verified: "true",
        name: "any_name",
        picture: faker.internet.url(),
        given_name: faker.person.firstName(),
        family_name: faker.person.lastName(),
      },
      statusCode: 200,
    };
    const user = await sut.loadUser({ accessToken: "any_accessToken" });
    expect(user.user).toHaveProperty("id");
    expect(user.user).toHaveProperty("given_name");
    expect(user.user).toHaveProperty("family_name");
    expect(user.user).toHaveProperty("email");
    expect(user.user).toHaveProperty("picture");
  });
  it("should return success false if loadUser fails", async () => {
    const { sut, httpClientMock } = makeSut();
    httpClientMock.responseGet = {
      statusCode: 400,
      data: {
        message: "any_message",
      },
    };
    const user = await sut.loadUser({ accessToken: "any_accessToken" });
    expect(user.success).toBeFalsy();
  });
  it("should return true if loadUser success", async () => {
    const { sut, httpClientMock } = makeSut();
    httpClientMock.responseGet = {
      data: {
        id: "any_id",
        email: "any_email",
        email_verified: "true",
        name: "any_name",
        picture: faker.internet.url(),
        given_name: faker.person.firstName(),
        family_name: faker.person.lastName(),
      },
      statusCode: 200,
    };
    const user = await sut.loadUser({ accessToken: "any_accessToken" });
    expect(user.success).toBeTruthy();
  });
  it("should call httClient with correct params", async () => {
    const { sut, httpClientMock } = makeSut();
    httpClientMock.responseGet = {
      data: {
        id: "any_id",
        first_name: "any_first_name",
        last_name: "any_last_name",
        email: "any_email",
        picture: {
          data: {
            height: 100,
            is_silhouette: true,
            url: faker.internet.url(),
            width: 100,
          },
        },
      },
      statusCode: 200,
    };
    const spyHttpClient = jest.spyOn(httpClientMock, "get");
    const accessToken = faker.lorem.words();
    await sut.loadUser({ accessToken });
    expect(spyHttpClient).toHaveBeenCalledWith(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  });
});
