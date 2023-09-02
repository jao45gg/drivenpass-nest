import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersRepository } from "./users.repository";
import * as bcrypt from "bcrypt";
import { user } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  private EXPIRATION_TIME = "2 hours";
  private ISSUER = "DrivenPass";
  private AUDIENCE = "users";

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.getUserByEmail(createUserDto.email);
    if (user) throw new ConflictException();

    const saltOrRounds = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    await this.userRepository.postUser(createUserDto.email, hash);
  }

  async signIn(createUserDto: CreateUserDto) {
    const user = await this.userRepository.getUserByEmail(createUserDto.email);
    if (!user) throw new UnauthorizedException();

    const hash = await bcrypt.compare(createUserDto.password, user.password);
    if (!hash) throw new UnauthorizedException();

    return await this.createToken(user);
  }

  private async createToken(user: user) {
    const { id, email } = user;

    const token = this.jwtService.sign(
      { email },
      {
        expiresIn: this.EXPIRATION_TIME,
        subject: String(id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );

    await this.userRepository.createToken(token, user.id);

    return { token };
  }
}
