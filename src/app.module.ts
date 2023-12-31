import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { CredentialsModule } from "./credentials/credentials.module";
import { NotesModule } from "./notes/notes.module";
import { CardsModule } from "./cards/cards.module";
import { EraseModule } from "./erase/erase.module";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    UsersModule,
    CredentialsModule,
    NotesModule,
    CardsModule,
    EraseModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
