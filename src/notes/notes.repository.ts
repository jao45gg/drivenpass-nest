import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateNoteDto } from "./dto/create-note.dto";

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByName(name: string) {
    return await this.prisma.notes.findFirst({
      where: {
        name,
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
}
