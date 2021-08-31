import { v4 as uuidv4 } from "uuid";

import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

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
    const user = new User();

    Object.assign(user, {
      id: uuidv4(),
      name,
      email,
      admin: false,
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  turnAdmin(receivedUser: User): User {
    receivedUser.admin = true;
    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
