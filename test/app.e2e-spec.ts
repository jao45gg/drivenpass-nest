import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { PrismaClient } from "@prisma/client";
import { createUser, createUserWithToken } from "./factories/user.factory";
import * as bcrypt from "bcrypt";
import {
  createCredential,
  createCredentialOnDB,
} from "./factories/credentials.factory";
import * as jwt from "jsonwebtoken";
import { createNote, createNoteOnDB } from "./factories/notes.factory";
import { createCard, createCardOnDB } from "./factories/cards.factory";

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
    await prisma.credentials.deleteMany();
    await prisma.notes.deleteMany();
    await prisma.cards.deleteMany();
    await prisma.tokens.deleteMany();
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
      const user = await createUserWithToken();

      const credential = createCredential(user.id);
      return request(app.getHttpServer())
        .post("/credentials")
        .send(credential)
        .set("Authorization", `Bearer ${user.token}`)
        .expect(201);
    });

    it("GET /credentials", async () => {
      const user = await createUserWithToken();
      const credential = await createCredentialOnDB(user.id);

      const response = await request(app.getHttpServer())
        .get("/credentials")
        .set("Authorization", `Bearer ${user.token}`);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: credential.id,
            name: credential.name,
            url: credential.url,
            username: credential.username,
            password: expect.any(String),
            userId: credential.userId,
          }),
        ]),
      );
    });

    it("GET /credentials/:id", async () => {
      const user = await createUserWithToken();
      const credential = await createCredentialOnDB(user.id);

      const response = await request(app.getHttpServer())
        .get(`/credentials/${credential.id}`)
        .set("Authorization", `Bearer ${user.token}`);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: credential.id,
          name: credential.name,
          url: credential.url,
          username: credential.username,
          password: expect.any(String),
          userId: credential.userId,
        }),
      );
    });

    it(" DELETE /credentials/:id", async () => {
      const user = await createUserWithToken();
      const credential = await createCredentialOnDB(user.id);

      const response = await request(app.getHttpServer())
        .delete(`/credentials/${credential.id}`)
        .set("Authorization", `Bearer ${user.token}`);

      expect(response.statusCode).toBe(HttpStatus.OK);
    });
  });

  describe("/notes", () => {
    it("POST /notes", async () => {
      const user = await createUserWithToken();

      const note = createNote(user.id);
      return request(app.getHttpServer())
        .post("/notes")
        .send(note)
        .set("Authorization", `Bearer ${user.token}`)
        .expect(201);
    });

    it("GET /notes", async () => {
      const user = await createUserWithToken();
      const note = await createNoteOnDB(user.id);

      const response = await request(app.getHttpServer())
        .get("/notes")
        .set("Authorization", `Bearer ${user.token}`);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: note.id,
            name: note.name,
            note: note.note,
            userId: note.userId,
          }),
        ]),
      );
    });

    it("GET /notes/:id", async () => {
      const user = await createUserWithToken();
      const note = await createNoteOnDB(user.id);

      const response = await request(app.getHttpServer())
        .get(`/notes/${note.id}`)
        .set("Authorization", `Bearer ${user.token}`);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: note.id,
          name: note.name,
          note: note.note,
          userId: note.userId,
        }),
      );
    });

    it(" DELETE /notes/:id", async () => {
      const user = await createUserWithToken();
      const note = await createNoteOnDB(user.id);

      const response = await request(app.getHttpServer())
        .delete(`/notes/${note.id}`)
        .set("Authorization", `Bearer ${user.token}`);

      expect(response.statusCode).toBe(HttpStatus.OK);
    });
  });

  describe("/cards", () => {
    it("POST /cards", async () => {
      const user = await createUserWithToken();

      const card = createCard(user.id);
      return request(app.getHttpServer())
        .post("/cards")
        .send(card)
        .set("Authorization", `Bearer ${user.token}`)
        .expect(201);
    });

    it("GET /cards", async () => {
      const user = await createUserWithToken();
      const card = await createCardOnDB(user.id);

      const response = await request(app.getHttpServer())
        .get("/cards")
        .set("Authorization", `Bearer ${user.token}`);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: card.id,
            name: card.name,
            cardNumber: card.cardNumber,
            cardName: card.cardName,
            cvvNumber: expect.any(String),
            expirationDate: card.expirationDate.toISOString(),
            cardPassword: expect.any(String),
            virtualCard: card.virtualCard,
            credit: card.credit,
            debit: card.debit,
            userId: card.userId,
          }),
        ]),
      );
    });

    it("GET /cards/:id", async () => {
      const user = await createUserWithToken();
      const card = await createCardOnDB(user.id);

      const response = await request(app.getHttpServer())
        .get(`/cards/${card.id}`)
        .set("Authorization", `Bearer ${user.token}`);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: card.id,
          name: card.name,
          cardNumber: card.cardNumber,
          cardName: card.cardName,
          cvvNumber: expect.any(String),
          expirationDate: card.expirationDate.toISOString(),
          cardPassword: expect.any(String),
          virtualCard: card.virtualCard,
          credit: card.credit,
          debit: card.debit,
          userId: card.userId,
        }),
      );
    });

    it(" DELETE /cards/:id", async () => {
      const user = await createUserWithToken();
      const card = await createCardOnDB(user.id);

      const response = await request(app.getHttpServer())
        .delete(`/cards/${card.id}`)
        .set("Authorization", `Bearer ${user.token}`);

      expect(response.statusCode).toBe(HttpStatus.OK);
    });
  });

  describe("/erase", () => {
    it(" DELETE /erase", async () => {
      const user = await createUserWithToken();
      await createCardOnDB(user.id);

      const response = await request(app.getHttpServer())
        .delete("/erase")
        .set("Authorization", `Bearer ${user.token}`)
        .send({ password: user.password });

      expect(response.statusCode).toBe(HttpStatus.OK);
    });
  });
});
