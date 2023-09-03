import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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

  async findAll(usuario: user) {
    return await this.notesRepository.getAll(usuario.id);
  }

  async findOne(id: number, usuario: user) {
    const note = await this.notesRepository.getById(id);
    if (!note) throw new NotFoundException();

    if (note.userId !== usuario.id)
      throw new ForbiddenException("Note not owned by this User!");

    return note;
  }

  async remove(id: number, usuario: user) {
    const note = await this.notesRepository.getById(id);
    if (!note) throw new NotFoundException();

    if (note.userId !== usuario.id)
      throw new ForbiddenException("Note not owned by this User!");

    await this.notesRepository.delete(id);
  }
}
