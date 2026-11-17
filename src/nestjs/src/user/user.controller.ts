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
  UseInterceptors,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UserService } from "./user.service.js";
import { RoleGuard } from "../guards/role.guard.ts";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { TimeoutInterceptor } from "../utils/timeout.interceptor.ts";
import { LoggingInterceptor } from "../utils/logging.interceptor.ts";

@UseInterceptors(LoggingInterceptor)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query("name") name?: string) {
    const data = await this.userService.findAllUsers(name);
    return data;
  }
  @Get("all")
  getAllUsers() {
    return this.userService.findAll();
  }
  @Get(":id")
  @UseInterceptors(new TimeoutInterceptor())
  getUserById(@Param("id", ParseIntPipe) id: number) {
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
