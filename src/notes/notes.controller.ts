import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { AuthGuard } from "../auth/auth-guard.guard";
import { User } from "../users/decorators/user-decorator.decorator";
import { users } from "@prisma/client";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("notes")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new note register" })
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(@Body() createNoteDto: CreateNoteDto, @User() usuario: users) {
    return await this.notesService.create(createNoteDto, usuario);
  }

  @Get()
  @ApiOperation({ summary: "Get all notes from the user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all notes from the user",
  })
  async findAll(@User() usuario: users) {
    return await this.notesService.findAll(usuario);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a note by id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return a note from the user by id",
  })
  @ApiParam({ name: "id", description: "Note id", example: 1 })
  async findOne(@Param("id") id: string, @User() usuario: users) {
    return await this.notesService.findOne(+id, usuario);
  }

  @Delete(":id")
  @ApiOperation({ summary: " Delete a note by id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete a note from the user by id",
  })
  @ApiParam({ name: "id", description: "Note id", example: 1 })
  async remove(@Param("id") id: string, @User() usuario: users) {
    return await this.notesService.remove(+id, usuario);
  }
}
