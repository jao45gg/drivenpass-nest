import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
// eslint-disable-next-line no-use-before-define, @typescript-eslint/no-var-requires
const Cryptr = require("cryptr");

const prisma = new PrismaClient();
const crypt = new Cryptr(process.env.CRYPT_SECRET);

function createCredential(userId: number) {
  return {
    name: faker.location.city(),
    url: faker.internet.url(),
    username: faker.person.firstName(),
    password: faker.internet.password(),
    userId,
  };
}

async function createCredentialOnDB(userId: number) {
  return await prisma.credentials.create({
    data: {
      name: faker.location.city(),
      url: faker.internet.url(),
      username: faker.person.firstName(),
      password: crypt.encrypt(faker.internet.password()),
      userId,
    },
  });
}

export { createCredential, createCredentialOnDB };
