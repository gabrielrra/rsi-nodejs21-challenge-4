import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;
    let user;
    try {
      user = this.showUserProfileUseCase.execute({ user_id });
    } catch (error) {
      switch (error.message) {
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

    return response.json(user);
  }
}

export { ShowUserProfileController };
