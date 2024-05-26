import { AuthWithEmailRepositoryDto } from '@/domain/repositories/auth-with-email-repository';
import { AccessDeniedException } from '@/domain/use-cases/errors/access-denied-exception';
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception';
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception';
import { HttpStatusCode } from '@/helpers/http/http-status-code';
import { UserMapper } from '@/infra/data-source/mappers/user-mapper';
import { AuthWithEmailRepositoryImpl } from '@/infra/data-source/repositories/auth/auth-with-email-repository-impl';
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
  const sut = new AuthWithEmailRepositoryImpl(URL, httpClientMock);
  const accessToken = faker.lorem.words();
  const refreshToken = faker.lorem.words();
  const user = makeUserDto();
  httpClientMock.responsePost = {
    statusCode: 200,
    data: {
      accessToken,
      refreshToken,
      user,
    },
  };

  return { httpClientMock, sut, accessToken, refreshToken, user };
};
const makeSutWithError = () => {
  const { httpClientMockWithError } = makeHttpClientMockWithError();
  const sut = new AuthWithEmailRepositoryImpl(URL, httpClientMockWithError);
  return { httpClientMockWithError, sut };
};
const makeRequest = (
  credentials: Partial<AuthWithEmailRepositoryDto> = {},
): AuthWithEmailRepositoryDto => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...credentials,
  };
};

describe('AuthWithEmailRepositoryImpl', () => {
  it('should return user, accessToken and refreshToken id success', async () => {
    const { sut, user, accessToken, refreshToken } = makeSut();

    const response = await sut.execute(makeRequest());
    expect(response).toEqual(
      right({
        accessToken,
        refreshToken,
        user: UserMapper.toUI(user),
      }),
    );
  });
  it('should return UserNotFoundException if user not found', async () => {
    const { sut, httpClientMock } = makeSut();

    httpClientMock.responsePost.statusCode = HttpStatusCode.NOT_FOUND;
    const response = await sut.execute(makeRequest());
    expect(response).toEqual(left(new UserNotFoundException()));
  });
  it('should return AccessDeniedException if user unauthorized', async () => {
    const { sut, httpClientMock } = makeSut();

    httpClientMock.responsePost.statusCode = HttpStatusCode.UNAUTHORIZED_ERROR;

    const response = await sut.execute(makeRequest());
    expect(response).toEqual(left(new AccessDeniedException()));
  });
  it('should return UnexpectedException for other exception cases', async () => {
    const { sut, httpClientMock } = makeSut();

    httpClientMock.responsePost.statusCode = HttpStatusCode.CONFLICT;
    const response = await sut.execute(makeRequest());
    expect(response).toEqual(left(new UnexpectedException()));
  });
  it('should throw if HttpClient throw', async () => {
    const { sut } = makeSutWithError();
    await expect(sut.execute(makeRequest())).rejects.toThrow();
  });
  it('should call HttpClient with correct params', async () => {
    const { sut, httpClientMock } = makeSut();
    const request = makeRequest();

    const httpClientSpy = jest.spyOn(httpClientMock, 'post');
    await sut.execute(request);
    expect(httpClientSpy).toHaveBeenCalledWith(URL, {
      body: {
        email: request.email,
        password: request.password,
      },
    });
  });
});
