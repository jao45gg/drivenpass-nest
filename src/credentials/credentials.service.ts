import { ConflictException, Injectable } from "@nestjs/common";
import { CreateCredentialDto } from "./dto/create-credential.dto";
import { UpdateCredentialDto } from "./dto/update-credential.dto";
import { CredetialsRepository } from "./credentials.repository";
import { user } from "@prisma/client";
// eslint-disable-next-line no-use-before-define, @typescript-eslint/no-var-requires
const Cryptr = require("cryptr");

@Injectable()
export class CredentialsService {
  constructor(private readonly credentialsRepository: CredetialsRepository) {}

  async create(createCredentialDto: CreateCredentialDto, usuario: user) {
    const credential =
      await this.credentialsRepository.findCredentialByNameAndUserId(
        createCredentialDto.name,
        usuario.id,
      );
    if (credential) throw new ConflictException();

    const crypt = new Cryptr(process.env.CRYPT_SECRET);
    const hash = crypt.encrypt(createCredentialDto.password);

    await this.credentialsRepository.createCredential(
      createCredentialDto,
      hash,
      usuario.id,
    );
  }

  findAll() {
    return `This action returns all credentials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} credential`;
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
