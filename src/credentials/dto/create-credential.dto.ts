import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateCredentialDto {
  @IsNotEmpty()
  @ApiProperty({
    example: "Login do google",
    description: "Name of the credential",
  })
  name: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    example: "https://www.google.com",
    description: "URL of the website",
  })
  url: string;

  @IsNotEmpty()
  @ApiProperty({
    example: "teste123",
    description: "Username of the website",
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    example: "senhaForte123",
    description: "Password of the website",
  })
  password: string;
}
