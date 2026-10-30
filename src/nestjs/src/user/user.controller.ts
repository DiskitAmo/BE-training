import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UserService } from "./user.service.js";
import { RoleGuard } from "../guards/role.guard.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(@Query("name") name: string) {
    return this.userService.findAllUsers(name);
  }

  @Get(":id")
  getUserById(@Param("id") id: number) {
    return this.userService.findOneUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto instanceof CreateUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Put(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  @UseGuards(RoleGuard)
  removeUser(@Param("id") id: number) {
    return this.userService.deleteUser(id);
  }
}
