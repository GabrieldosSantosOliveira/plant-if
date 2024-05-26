import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception';
import { HttpStatusCode } from '@/helpers/http/http-status-code';
import { UserMapper } from '@/infra/data-source/mappers/user-mapper';
import { AuthWithGoogleRepositoryImpl } from '@/infra/data-source/repositories/auth/auth-with-google-repository-impl';
import { left, right } from '@/shared/either';
import { makeUserDto } from '@/test/infra/mocks/data-source/dtos/make-user-dto';
import {
  makeHttpClientMock,
  makeHttpClientMockWithError,
} from '@/test/infra/mocks/http/make-http-client-mock';
import { faker } from '@faker-js/faker';
const URL = 'any_url';
const makeSut = () => {
  const { httpClientMock } = makeHttpClientMock();
  const sut = new AuthWithGoogleRepositoryImpl(URL, httpClientMock);
  const accessToken = faker.lorem.words();
  const refreshToken = faker.lorem.words();
  const user = makeUserDto();
  httpClientMock.responsePost = {
    data: {
      accessToken,
      refreshToken,
      user,
    },
    statusCode: HttpStatusCode.OK,
  };
  return { sut, httpClientMock, user, accessToken, refreshToken };
};
const makeSutWithError = () => {
  const { httpClientMockWithError } = makeHttpClientMockWithError();
  const sut = new AuthWithGoogleRepositoryImpl(URL, httpClientMockWithError);

  return { sut, httpClientMockWithError };
};
const ACCESS_TOKEN = 'any_access_token';
describe('AuthWithGoogleRepositoryImpl', () => {
  it('should return accessToken, refreshToken and user if success', async () => {
    const { sut, user, refreshToken, accessToken } = makeSut();
    const response = await sut.execute(ACCESS_TOKEN);
    expect(response).toEqual(
      right({
        user: UserMapper.toUI(user),
        refreshToken,
        accessToken,
      }),
    );
  });
  it('should return UnexpectedException for others exceptions', async () => {
    const { sut, httpClientMock } = makeSut();
    httpClientMock.responsePost.statusCode = HttpStatusCode.BAD_REQUEST;
    const response = await sut.execute(ACCESS_TOKEN);
    expect(response).toEqual(left(new UnexpectedException()));
  });
  it('should throw if HttpClient throw', async () => {
    const { sut } = makeSutWithError();
    await expect(sut.execute(ACCESS_TOKEN)).rejects.toThrow();
  });
  it('should call HttpClient with correct params', async () => {
    const { sut, httpClientMock } = makeSut();
    const httpClientSpy = jest.spyOn(httpClientMock, 'post');
    await sut.execute(ACCESS_TOKEN);
    expect(httpClientSpy).toHaveBeenCalledWith(URL, {
      body: {
        accessToken: ACCESS_TOKEN,
      },
    });
  });
});
