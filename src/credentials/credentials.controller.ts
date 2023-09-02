import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CredentialsService } from "./credentials.service";
import { CreateCredentialDto } from "./dto/create-credential.dto";
import { UpdateCredentialDto } from "./dto/update-credential.dto";
import { AuthGuard } from "../auth/auth-guard.guard";
import { User } from "../users/decorators/user-decorator.decorator";
import { user } from "@prisma/client";

@Controller("credentials")
@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  async create(
    @Body() createCredentialDto: CreateCredentialDto,
    @User() usuario: user,
  ) {
    return await this.credentialsService.create(createCredentialDto, usuario);
  }

  @Get()
  async findAll(@User() usuario: user) {
    return await this.credentialsService.findAll(usuario);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @User() usuario: user) {
    return await this.credentialsService.findOne(+id, usuario);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @User() usuario: user) {
    return this.credentialsService.remove(+id, usuario);
  }
}
