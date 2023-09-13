import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const user_id = request.header("user_id");
    let users;
    try {
      users = this.listAllUsersUseCase.execute({ user_id });
    } catch (error) {
      switch (error.message) {
        case "FORBIDDEN_ACCESS":
          return response.status(400).json({
            error: "Only admins can list users",
          });
        case "USER_NOT_FOUND":
          return response.status(404).json({
            error: "User not found",
          });

        default:
          return response.status(500).json({
            error: "Sorry... An unknown error has occurred",
            details: error.stack,
          });
      }
    }
    return response.status(200).json(users);
  }
}

export { ListAllUsersController };
