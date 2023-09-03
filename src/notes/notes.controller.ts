import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { AuthGuard } from "../auth/auth-guard.guard";
import { User } from "../users/decorators/user-decorator.decorator";
import { user } from "@prisma/client";

@UseGuards(AuthGuard)
@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto, @User() usuario: user) {
    return await this.notesService.create(createNoteDto, usuario);
  }

  @Get()
  async findAll(@User() usuario: user) {
    return await this.notesService.findAll(usuario);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @User() usuario: user) {
    return await this.notesService.findOne(+id, usuario);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @User() usuario: user) {
    return await this.notesService.remove(+id, usuario);
  }
}
