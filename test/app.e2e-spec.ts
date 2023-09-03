import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { PrismaClient } from "@prisma/client";
import createUser from "./factories/user.factory";
import * as bcrypt from "bcrypt";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await prisma.users.deleteMany();
    await app.init();
  });

  it("/health", () => {
    return request(app.getHttpServer())
      .get("/health")
      .expect(200)
      .expect("I'm okay!");
  });

  describe("/users", () => {
    it("POST /sign-up", async () => {
      const user = createUser();
      return request(app.getHttpServer())
        .post("/users/sign-up")
        .send(user)
        .expect(201);
    });

    it("POST /sign-in", async () => {
      const user = createUser();
      const saltOrRounds = await bcrypt.genSalt();
      const hash = await bcrypt.hash(user.password, saltOrRounds);
      await prisma.users.create({
        data: {
          email: user.email,
          password: hash,
        },
      });

      const response = await request(app.getHttpServer())
        .post("/users/sign-in")
        .send(user);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          token: expect.any(String),
        }),
      );
    });
  });

  describe("/credentials", () => {
    it("POST /credentials", async () => {
      const user = createUser();
      return request(app.getHttpServer())
        .post("/credentials")
        .send(user)
        .expect(201);
    });

    it("POST /sign-in", async () => {
      const user = createUser();
      const saltOrRounds = await bcrypt.genSalt();
      const hash = await bcrypt.hash(user.password, saltOrRounds);
      await prisma.users.create({
        data: {
          email: user.email,
          password: hash,
        },
      });

      const response = await request(app.getHttpServer())
        .post("/users/sign-in")
        .send(user);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          token: expect.any(String),
        }),
      );
    });
  });
});
