import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { AuthGuard } from "../auth/auth-guard.guard";
import { User } from "../users/decorators/user-decorator.decorator";
import { user } from "@prisma/client";

@UseGuards(AuthGuard)
@Controller("cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto, @User() usuario: user) {
    return await this.cardsService.create(createCardDto, usuario);
  }

  @Get()
  async findAll(@User() usuario: user) {
    return await this.cardsService.findAll(usuario);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @User() usuario: user) {
    return await this.cardsService.findOne(+id, usuario);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @User() usuario: user) {
    return await this.cardsService.remove(+id, usuario);
  }
}
