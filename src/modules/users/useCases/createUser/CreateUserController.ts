import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    // Constructor
  }

  handle(request: Request, response: Response): Response {
    return response.status(200).send();
  }
}

export { CreateUserController };
