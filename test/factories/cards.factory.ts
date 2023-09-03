import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
// eslint-disable-next-line no-use-before-define, @typescript-eslint/no-var-requires
const Cryptr = require("cryptr");

const prisma = new PrismaClient();
const crypt = new Cryptr(process.env.CRYPT_SECRET);

function createCard(userId: number) {
  return {
    name: faker.location.city(),
    cardNumber: faker.number.int().toString(),
    cardName: faker.person.firstName(),
    cvvNumber: faker.number.int({ min: 100, max: 999 }).toString(),
    expirationDate: faker.date.future(),
    cardPassword: faker.internet.password(),
    virtualCard: faker.datatype.boolean(),
    credit: faker.datatype.boolean(),
    debit: faker.datatype.boolean(),
    userId,
  };
}

async function createCardOnDB(userId: number) {
  return await prisma.cards.create({
    data: {
      name: faker.location.city(),
      cardNumber: faker.number.int().toString(),
      cardName: faker.person.firstName(),
      cvvNumber: crypt.encrypt(faker.number.int({ min: 100, max: 999 })),
      expirationDate: faker.date.future(),
      cardPassword: crypt.encrypt(faker.internet.password()),
      virtualCard: faker.datatype.boolean(),
      credit: faker.datatype.boolean(),
      debit: faker.datatype.boolean(),
      userId,
    },
  });
}

export { createCard, createCardOnDB };
