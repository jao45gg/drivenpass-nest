import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class EraseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async erase(userId: number) {
    await this.prisma.tokens.deleteMany({
      where: {
        userId,
      },
    });

    await this.prisma.credentials.deleteMany({
      where: {
        userId,
      },
    });

    await this.prisma.notes.deleteMany({
      where: {
        userId,
      },
    });

    await this.prisma.cards.deleteMany({
      where: {
        userId,
      },
    });

    await this.prisma.users.deleteMany({
      where: {
        id: userId,
      },
    });
  }
}
