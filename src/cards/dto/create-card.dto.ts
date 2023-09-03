import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty } from "class-validator";

export class CreateCardDto {
  @IsNotEmpty()
  @ApiProperty({ example: "Cartão visa GOLD", description: "Name of the card" })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: "4929 5787 7670 8922", description: "Card number" })
  cardNumber: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Joao Braga", description: "Name printed on card" })
  cardName: string;

  @IsNotEmpty()
  @ApiProperty({ example: "661", description: "CVV number" })
  cvvNumber: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: "2023-09-03T21:15:10.091Z",
    description: "Card expiration date",
  })
  expirationDate: Date;

  @IsNotEmpty()
  @ApiProperty({ example: "1234", description: "Card password" })
  cardPassword: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: "true", description: "Is the card a virtual card?" })
  virtualCard: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: "false", description: "Is the card a credit card?" })
  credit: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: "false", description: "Is the card a debit card?" })
  debit: boolean;
}
