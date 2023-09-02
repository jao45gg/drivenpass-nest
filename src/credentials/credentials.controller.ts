import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Body,
} from "@nestjs/common";
import { CredentialsService } from "./credentials.service";
import { CreateCredentialDto } from "./dto/create-credential.dto";
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
  async remove(@Param("id") id: string, @User() usuario: user) {
    return await this.credentialsService.remove(+id, usuario);
  }
}
