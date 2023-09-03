import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Body,
  HttpStatus,
} from "@nestjs/common";
import { CredentialsService } from "./credentials.service";
import { CreateCredentialDto } from "./dto/create-credential.dto";
import { AuthGuard } from "../auth/auth-guard.guard";
import { User } from "../users/decorators/user-decorator.decorator";
import { users } from "@prisma/client";
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("credentials")
@ApiBearerAuth()
@Controller("credentials")
@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new card credential" })
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(
    @Body() createCredentialDto: CreateCredentialDto,
    @User() usuario: users,
  ) {
    return await this.credentialsService.create(createCredentialDto, usuario);
  }

  @Get()
  @ApiOperation({ summary: "Get all credentials from the user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all credentials from the user",
  })
  async findAll(@User() usuario: users) {
    return await this.credentialsService.findAll(usuario);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a credential by id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return a credential from the user by id",
  })
  @ApiParam({ name: "id", description: "Credential id", example: 1 })
  async findOne(@Param("id") id: string, @User() usuario: users) {
    return await this.credentialsService.findOne(+id, usuario);
  }

  @Delete(":id")
  @ApiOperation({ summary: " Delete a credential by id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete a credential from the user by id",
  })
  @ApiParam({ name: "id", description: "Credential id", example: 1 })
  async remove(@Param("id") id: string, @User() usuario: users) {
    return await this.credentialsService.remove(+id, usuario);
  }
}
