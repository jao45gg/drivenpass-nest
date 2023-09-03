import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class CreateCardDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  cardNumber: number;

  @IsNotEmpty()
  @IsString()
  cardName: string;

  @IsNotEmpty()
  @IsNumber()
  cvvNumber: number;

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
