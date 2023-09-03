import { IsNotEmpty } from "class-validator";

export class EraseDto {
  @IsNotEmpty()
  password: string;
}
