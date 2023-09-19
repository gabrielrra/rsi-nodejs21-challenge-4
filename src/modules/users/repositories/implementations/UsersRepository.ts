import { v4 as uuidV4 } from "uuid";

import { User } from "../../model/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];
  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const existingUser = this.findByEmail(email);

    if (existingUser) throw new Error("USER_ALREADY_EXISTS");

    if (!name) throw new Error("NAME_IS_NECESSSARY");
    if (!email) throw new Error("EMAIL_IS_NECESSSARY");

    const user = new User();

    Object.assign(user, {
      name,
      email,
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new Error("USER_NOT_FOUND");

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    if (userIndex === -1) throw new Error("USER_NOT_FOUND");

    this.users[userIndex].admin = true;

    return this.users[userIndex];
  }

  list(): User[] {
    return this.users;
  }

  delete(user_id: string): void {
    this.findById(user_id);
    const userIndex = this.users.findIndex((user) => user.id === user_id);
    this.users.splice(userIndex);
  }
}

export { UsersRepository };
