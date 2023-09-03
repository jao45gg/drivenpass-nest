import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { users } from "@prisma/client";
import { NotesRepository } from "./notes.repository";

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async create(createNoteDto: CreateNoteDto, usuario: users) {
    const note = await this.notesRepository.getByNameAndUserId(
      createNoteDto.name,
      usuario.id,
    );
    if (note) throw new ConflictException();

    await this.notesRepository.create(createNoteDto, usuario.id);
  }

  async findAll(usuario: users) {
    return await this.notesRepository.getAll(usuario.id);
  }

  async findOne(id: number, usuario: users) {
    const note = await this.notesRepository.getById(id);
    if (!note) throw new NotFoundException();

    if (note.userId !== usuario.id)
      throw new ForbiddenException("Note not owned by this User!");

    return note;
  }

  async remove(id: number, usuario: users) {
    const note = await this.notesRepository.getById(id);
    if (!note) throw new NotFoundException();

    if (note.userId !== usuario.id)
      throw new ForbiddenException("Note not owned by this User!");

    await this.notesRepository.delete(id);
  }
}
