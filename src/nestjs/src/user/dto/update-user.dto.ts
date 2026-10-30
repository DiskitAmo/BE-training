import { CreateUserDto } from "./create-user.dto.js";
import { PartialType } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {}
