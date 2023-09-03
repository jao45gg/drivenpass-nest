import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateNoteDto } from "./dto/create-note.dto";

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByNameAndUserId(name: string, userId: number) {
    return await this.prisma.notes.findFirst({
      where: {
        name,
        userId,
      },
    });
  }

  async getById(id: number) {
    return await this.prisma.notes.findUnique({
      where: {
        id,
      },
    });
  }

  async create(createNoteDto: CreateNoteDto, userId: number) {
    return await this.prisma.notes.create({
      data: {
        name: createNoteDto.name,
        note: createNoteDto.note,
        userId,
      },
    });
  }

  async getAll(userId: number) {
    return await this.prisma.notes.findMany({
      where: {
        userId,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.notes.delete({
      where: {
        id,
      },
    });
  }
}
