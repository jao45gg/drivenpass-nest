import { ConflictException, Injectable } from "@nestjs/common";
import { CreateCardDto } from "./dto/create-card.dto";
import { user } from "@prisma/client";
import { CardsRepository } from "./cards.repository";
// eslint-disable-next-line no-use-before-define, @typescript-eslint/no-var-requires
const Cryptr = require("cryptr");

@Injectable()
export class CardsService {
  crypt = new Cryptr(process.env.CRYPT_SECRET);
  constructor(private readonly cardsRepository: CardsRepository) {}

  async create(createCardDto: CreateCardDto, usuario: user) {
    const card = await this.cardsRepository.getByNameAndUserId(
      createCardDto.name,
      usuario.id,
    );
    if (card) throw new ConflictException();

    const hashPassword = this.crypt.encrypt(createCardDto.cardPassword);
    const hashCvv = this.crypt.encrypt(createCardDto.cvvNumber);

    await this.cardsRepository.create(
      createCardDto,
      usuario.id,
      hashPassword,
      hashCvv,
    );
  }

  findAll() {
    return `This action returns all cards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
