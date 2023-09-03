import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class EraseDto {
  @IsNotEmpty()
  @ApiProperty({
    example: "senhaForte123",
    description: "Password of the user",
  })
  password: string;
}
