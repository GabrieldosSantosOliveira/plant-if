import { LoadFacebookUserImpl } from "@/infra/gateways/facebook/load-facebook-user-impl";
import { faker } from "@faker-js/faker";

import { makeHttpClientMock } from "../../mocks/http/make-http-client-mock";

const makeSut = () => {
  const { httpClientMock } = makeHttpClientMock();
  const sut = new LoadFacebookUserImpl(httpClientMock);
  return { sut, httpClientMock };
};
describe("LoadFacebookUserImpl", () => {
  it("should return user if success", async () => {
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
    const user = await sut.loadUser({ accessToken: "any_accessToken" });
    expect(user.user).toHaveProperty("email");
    expect(user.user).toHaveProperty("firstName");
    expect(user.user).toHaveProperty("id");
    expect(user.user).toHaveProperty("lastName");
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
    await sut.loadUser({ accessToken: "any_accessToken" });
    expect(spyHttpClient).toHaveBeenCalledWith(
      "https://graph.facebook.com/me",
      {
        params: {
          fields: ["id", "first_name", "last_name", "picture", "email"].join(
            ",",
          ),
          access_token: "any_accessToken",
        },
      },
    );
  });
});
