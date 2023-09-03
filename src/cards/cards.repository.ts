import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCardDto } from "./dto/create-card.dto";

@Injectable()
export class CardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByNameAndUserId(name: string, userId: number) {
    return await this.prisma.cards.findFirst({
      where: {
        name,
        userId,
      },
    });
  }

  async create(
    createCardDto: CreateCardDto,
    userId: number,
    cardPassword: string,
    cvvNumber: string,
  ) {
    return await this.prisma.cards.create({
      data: {
        name: createCardDto.name,
        cardNumber: createCardDto.cardNumber,
        cardName: createCardDto.cardName,
        cvvNumber,
        expirationDate: createCardDto.expirationDate,
        cardPassword,
        virtualCard: createCardDto.virtualCard,
        credit: createCardDto.credit,
        debit: createCardDto.debit,
        userId,
      },
    });
  }
}
