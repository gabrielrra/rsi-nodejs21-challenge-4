import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {
    // Constructor
  }

  execute({ user_id }: IRequest): User[] {
    const user = new User();
    return [user];
  }
}

export { ListAllUsersUseCase };
