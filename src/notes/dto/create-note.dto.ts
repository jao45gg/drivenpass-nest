import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateNoteDto {
  @IsNotEmpty()
  @ApiProperty({ example: "Minhas anotações", description: "Name of the note" })
  name: string;
  @IsNotEmpty()
  @ApiProperty({
    example: "Essa é o texto da nota",
    description: "Text of the note",
  })
  note: string;
}
