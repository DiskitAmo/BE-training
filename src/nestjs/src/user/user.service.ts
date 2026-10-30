import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, name: "John", email: "alice@example.com" },
    { id: 2, name: "Jane", email: "bob@example.com" },
    { id: 3, name: "Doe", email: "charlie@example.com" },
  ];

  findAllUsers(name: string = "") {
    if (name) {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      );
    }
  }

  findOneUserById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: this.users.length + 1,
      name: createUserDto.name,
      email: createUserDto.email,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): User {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
      id,
    };

    return this.users[index];
  }

  deleteUser(id: number): User {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const [deletedUser] = this.users.splice(index, 1);
    return deletedUser;
  }
}
