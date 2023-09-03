import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();

function createUser() {
  return {
    email: faker.internet.email(),
    password: "@Ae1234567",
  };
}

async function createUserWithToken() {
  const user = createUser();

  const saltOrRounds = await bcrypt.genSalt();
  const hash = await bcrypt.hash(user.password, saltOrRounds);

  const newUser = await prisma.users.create({
    data: {
      email: user.email,
      password: hash,
    },
  });

  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);
  await prisma.tokens.create({
    data: {
      token,
      userId: newUser.id,
    },
  });

  return { token, id: newUser.id, password: user.password };
}

export { createUser, createUserWithToken };
