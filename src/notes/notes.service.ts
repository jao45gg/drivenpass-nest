import { ConflictException, Injectable } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { user } from "@prisma/client";
import { NotesRepository } from "./notes.repository";

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async create(createNoteDto: CreateNoteDto, usuario: user) {
    const note = await this.notesRepository.getByName(createNoteDto.name);
    if (note) throw new ConflictException();

    await this.notesRepository.create(createNoteDto, usuario.id);
  }

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
