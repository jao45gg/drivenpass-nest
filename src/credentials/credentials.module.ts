import { Module } from "@nestjs/common";
import { CredentialsService } from "./credentials.service";
import { CredentialsController } from "./credentials.controller";
import { CredetialsRepository } from "./credentials.repository";

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService, CredetialsRepository],
})
export class CredentialsModule {}
