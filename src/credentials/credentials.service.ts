import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCredentialDto } from "./dto/create-credential.dto";
import { CredetialsRepository } from "./credentials.repository";
import { user } from "@prisma/client";
// eslint-disable-next-line no-use-before-define, @typescript-eslint/no-var-requires
const Cryptr = require("cryptr");

@Injectable()
export class CredentialsService {
  crypt = new Cryptr(process.env.CRYPT_SECRET);
  constructor(private readonly credentialsRepository: CredetialsRepository) {}

  async create(createCredentialDto: CreateCredentialDto, usuario: user) {
    const credential =
      await this.credentialsRepository.findCredentialByNameAndUserId(
        createCredentialDto.name,
        usuario.id,
      );
    if (credential) throw new ConflictException();

    const hash = this.crypt.encrypt(createCredentialDto.password);

    await this.credentialsRepository.createCredential(
      createCredentialDto,
      hash,
      usuario.id,
    );
  }

  async findAll(usuario: user) {
    const credentials = await this.credentialsRepository.getAll(usuario);
    return credentials.map((c) => ({
      id: c.id,
      name: c.name,
      url: c.url,
      username: c.username,
      password: this.crypt.decrypt(c.password),
      userId: c.userId,
    }));
  }

  async findOne(id: number, usuario: user) {
    const credential = await this.credentialsRepository.getById(id);
    if (!credential) throw new NotFoundException();

    if (credential.userId !== usuario.id) throw new ForbiddenException();

    return {
      id: credential.id,
      name: credential.name,
      url: credential.url,
      username: credential.username,
      password: this.crypt.decrypt(credential.password),
      userId: credential.userId,
    };
  }

  async remove(id: number, usuario: user) {
    const credential = await this.credentialsRepository.getById(id);
    if (!credential) throw new NotFoundException();

    if (credential.userId !== usuario.id) throw new ForbiddenException();

    await this.credentialsRepository.deleteById(id);
  }
}
