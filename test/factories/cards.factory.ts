import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function createNote(userId: number) {
  return {
    name: faker.location.city(),
    note: faker.lorem.sentence(),
    userId,
  };
}

async function createNoteOnDB(userId: number) {
  return await prisma.notes.create({
    data: {
      name: faker.location.city(),
      note: faker.lorem.sentence(),
      userId,
    },
  });
}

export { createNote, createNoteOnDB };
