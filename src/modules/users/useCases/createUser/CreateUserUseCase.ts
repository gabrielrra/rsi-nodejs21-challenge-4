import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {
    // Constructor
  }

  execute({ email, name }: IRequest): User {
    const user = new User();
    return user;
  }
}

export { CreateUserUseCase };
