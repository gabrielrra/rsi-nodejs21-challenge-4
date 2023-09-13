import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    let user;
    const { user_id } = request.params;
    try {
      user = this.turnUserAdminUseCase.execute({ user_id });
    } catch (error) {
      switch (error.message) {
        case "USER_NOT_FOUND":
          return response.status(404).json({ error: "User not found" });
        default:
          return response.status(500).json({
            error: "Sorry... An unknown error has occurred",
            details: error.stack,
          });
      }
    }
    return response.status(200).json(user);
  }
}

export { TurnUserAdminController };
