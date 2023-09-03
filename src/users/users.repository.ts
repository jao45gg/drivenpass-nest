import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByEmail(email: string) {
    return await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserById(id: number) {
    return await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  async postUser(email: string, password: string) {
    return await this.prisma.users.create({
      data: {
        email,
        password,
      },
    });
  }

  async createToken(token: string, userId: number) {
    return await this.prisma.tokens.create({
      data: {
        token,
        userId,
      },
    });
  }

  async checkToken(token: string) {
    return await this.prisma.tokens.findFirst({
      where: {
        token,
      },
    });
  }
}
