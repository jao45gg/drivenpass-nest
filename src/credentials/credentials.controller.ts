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
  create(
    @Body() createCredentialDto: CreateCredentialDto,
    @User() usuario: user,
  ) {
    return this.credentialsService.create(createCredentialDto, usuario);
  }

  @Get()
  findAll() {
    return this.credentialsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.credentialsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCredentialDto: UpdateCredentialDto,
  ) {
    return this.credentialsService.update(+id, updateCredentialDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.credentialsService.remove(+id);
  }
}
