export class Left<L, R> {
  constructor(public readonly value: L) {}
  isRight(): this is Right<L, R> {
    return false;
  }

  isLeft(): this is Left<L, R> {
    return true;
  }
}
export class Right<L, R> {
  constructor(public readonly value: R) {}
  isRight(): this is Right<L, R> {
    return true;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }
}
export const left = <L, R>(v: L): Left<L, R> => {
  return new Left<L, R>(v);
};
export const right = <L, R>(v: R): Right<L, R> => {
  return new Right<L, R>(v);
};

export type Either<L, R> = Left<L, R> | Right<L, R>;
