import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    // Constructor
  }

  handle(request: Request, response: Response): Response {
    let user;
    try {
      user = this.createUserUseCase.execute(request.body);
    } catch (error) {
      switch (error.message) {
        case "USER_ALREADY_EXISTS":
          return response.status(400).json({ error: "Email already taken!" });
        default:
          return response.status(500).json({
            error: "Sorry... An unknown error has occurred",
            details: error.stack,
          });
      }
    }
    return response.status(201).json(user);
  }
}

export { CreateUserController };
