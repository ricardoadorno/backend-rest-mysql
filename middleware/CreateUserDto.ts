import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string;
}
