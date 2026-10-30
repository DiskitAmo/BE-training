import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsEmail()
  email!: string;
}
//user/dto/create-user.dto.ts
// import { z } from "zod";

// export const createUserSchema = z.object({
//   name: z.string().min(2),
//   age: z.number().int().min(0).optional(),
// });

// export type CreateUserDto = z.infer<typeof createUserSchema>;
