import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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

  async findAll(usuario: user) {
    const cards = await this.cardsRepository.getAll(usuario.id);
    return cards.map((c) => ({
      id: c.id,
      name: c.name,
      cardNumber: c.cardNumber,
      cardName: c.cardName,
      cvvNumber: this.crypt.decrypt(c.cvvNumber),
      expirationDate: c.expirationDate,
      cardPassword: this.crypt.decrypt(c.cardPassword),
      virtualCard: c.virtualCard,
      credit: c.credit,
      debit: c.debit,
      userId: c.userId,
    }));
  }

  async findOne(id: number, usuario: user) {
    const card = await this.cardsRepository.getById(id);
    if (!card) throw new NotFoundException();

    if (card.userId !== usuario.id)
      throw new ForbiddenException("Card not owned by this User!");

    return {
      id: card.id,
      name: card.name,
      cardNumber: card.cardNumber,
      cardName: card.cardName,
      cvvNumber: this.crypt.decrypt(card.cvvNumber),
      expirationDate: card.expirationDate,
      cardPassword: this.crypt.decrypt(card.cardPassword),
      virtualCard: card.virtualCard,
      credit: card.credit,
      debit: card.debit,
      userId: card.userId,
    };
  }

  async remove(id: number, usuario: user) {
    const card = await this.cardsRepository.getById(id);
    if (!card) throw new NotFoundException();

    if (card.userId !== usuario.id)
      throw new ForbiddenException("Card not owned by this User!");

    await this.cardsRepository.deleteById(id);
  }
}
