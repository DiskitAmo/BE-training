import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { Prisma, PrismaClient } from "../../../generated/prisma/client.ts";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
     
    return this.prisma.user1.findMany({ orderBy: { id: "asc" } });
  }

  async findAllUsers(name: string = "") {
    const users = await this.prisma.user1.findMany({
      where: name
        ? { name: { contains: name, mode: "insensitive" } }
        : undefined,
    });
    console.log(users);
    return users;
  }

  async findOneUserById(id: number) {
    // const user = this.users.find((user) => user.id === id);
    // if (!user) {
    //   throw new NotFoundException("User not found");
    // }
    // return user;
    const user = await this.prisma.user1.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async findByEmail(email: string) {
    //return this.users.find((user) => user.email === email);
    return this.prisma.user1.findUnique({ where: { email } });
  }

  createUser(createUserDto: CreateUserDto) {
    // const newUser: User = {
    //   id: this.users.length + 1,
    //   name: createUserDto.name,
    //   email: createUserDto.email,
    // };
    // this.users.push(newUser);
    // return newUser;
    console.log("Creating user with data:", createUserDto);
    return this.prisma.user1.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
      },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    // const index = this.users.findIndex((user) => user.id === id);
    // if (index === -1) {
    //   throw new NotFoundException(`User with id ${id} not found`);
    // }
    // this.users[index] = {
    //   ...this.users[index],
    //   ...updateUserDto,
    //   id,
    // };
    // return this.users[index];
    try {
      return await this.prisma.user1.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2025"
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw e;
    }
  }

  async deleteUser(id: number) {
    //   const index = this.users.findIndex((user) => user.id === id);

    //   if (index === -1) {
    //     throw new NotFoundException(`User with id ${id} not found`);
    //   }
    //   const [deletedUser] = this.users.splice(index, 1);
    //   return deletedUser;
    // }
    try {
      return await this.prisma.user1.delete({ where: { id } });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2025"
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw e;
    }
  }
}
