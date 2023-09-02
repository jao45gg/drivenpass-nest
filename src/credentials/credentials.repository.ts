import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCredentialDto } from "./dto/create-credential.dto";

@Injectable()
export class CredetialsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findCredentialByNameAndUserId(name: string, userId: number) {
    return await this.prisma.credentials.findFirst({
      where: {
        name,
        userId,
      },
    });
  }

  async createCredential(
    createCredentialDto: CreateCredentialDto,
    password: string,
    userId: number,
  ) {
    return await this.prisma.credentials.create({
      data: {
        name: createCredentialDto.name,
        url: createCredentialDto.url,
        username: createCredentialDto.username,
        password,
        userId,
      },
    });
  }
}
