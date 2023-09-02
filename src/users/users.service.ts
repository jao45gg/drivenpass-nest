import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.getUserByEmail(createUserDto.email);
    if (user) throw new ConflictException();

    const saltOrRounds = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    await this.userRepository.postUser(createUserDto.email, hash);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
