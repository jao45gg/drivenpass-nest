import { IsBoolean, IsDateString, IsNotEmpty } from "class-validator";

export class CreateCardDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cardNumber: string;

  @IsNotEmpty()
  cardName: string;

  @IsNotEmpty()
  cvvNumber: string;

  @IsNotEmpty()
  @IsDateString()
  expirationDate: Date;

  @IsNotEmpty()
  cardPassword: string;

  @IsNotEmpty()
  @IsBoolean()
  virtualCard: boolean;

  @IsNotEmpty()
  @IsBoolean()
  credit: boolean;

  @IsNotEmpty()
  @IsBoolean()
  debit: boolean;
}
