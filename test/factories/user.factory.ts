import { faker } from "@faker-js/faker";

export default function createUser() {
  return {
    email: faker.internet.email(),
    password: "@Ae1234567",
  };
}
