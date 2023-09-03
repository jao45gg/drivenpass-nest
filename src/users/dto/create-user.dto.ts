import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: "joao@joao.com", description: "Email of the user" })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 10,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  @ApiProperty({
    example: "senhaForte123",
    description: "Password of the user",
  })
  password: string;
}
