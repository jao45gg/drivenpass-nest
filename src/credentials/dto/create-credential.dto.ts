import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateCredentialDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
