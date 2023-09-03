import { IsNotEmpty } from "class-validator";

export class CreateNoteDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  note: string;
}
