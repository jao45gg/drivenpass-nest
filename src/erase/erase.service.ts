import { Injectable, UnauthorizedException } from "@nestjs/common";
import { EraseRepository } from "./erase.repository";
import { users } from "@prisma/client";
import { EraseDto } from "./dto/create-erase.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class EraseService {
  constructor(private readonly eraseRepository: EraseRepository) {}

  async remove(eraseDto: EraseDto, usuario: users) {
    const result = await bcrypt.compare(eraseDto.password, usuario.password);
    if (!result) new UnauthorizedException();

    await this.eraseRepository.erase(usuario.id);
  }
}
