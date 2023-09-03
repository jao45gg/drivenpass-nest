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
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { AuthGuard } from "../auth/auth-guard.guard";
import { User } from "../users/decorators/user-decorator.decorator";
import { users } from "@prisma/client";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("cards")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new card register" })
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(@Body() createCardDto: CreateCardDto, @User() usuario: users) {
    return await this.cardsService.create(createCardDto, usuario);
  }

  @Get()
  @ApiOperation({ summary: "Get all cards from the user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all cards from the user",
  })
  async findAll(@User() usuario: users) {
    return await this.cardsService.findAll(usuario);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a card by id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return a card from the user by id",
  })
  @ApiParam({ name: "id", description: "Card id", example: 1 })
  async findOne(@Param("id") id: string, @User() usuario: users) {
    return await this.cardsService.findOne(+id, usuario);
  }

  @Delete(":id")
  @ApiOperation({ summary: " Delete a card by id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete a card from the user by id",
  })
  @ApiParam({ name: "id", description: "Card id", example: 1 })
  async remove(@Param("id") id: string, @User() usuario: users) {
    return await this.cardsService.remove(+id, usuario);
  }
}
