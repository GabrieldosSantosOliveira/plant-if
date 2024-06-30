import { UnauthorizedExceptionHandler } from "../../../presentation/exception-handler/unauthorized-exception-handler";
import { UserAlreadyExistsExceptionHandler } from "../../../presentation/exception-handler/user-already-exists-exception-handler";
import { UserNotFoundExceptionHandler } from "../../../presentation/exception-handler/user-not-found-exception-handler";
import { Controller } from "../../../presentation/protocols/controller/controller";
import { GlobalHandlerException } from "../../global-handler-exception/global-handler-exception";

export const makeGlobalHandlerException = (controller: Controller) =>
  new GlobalHandlerException(controller, [
    new UnauthorizedExceptionHandler(),
    new UserAlreadyExistsExceptionHandler(),
    new UserNotFoundExceptionHandler(),
  ]);
