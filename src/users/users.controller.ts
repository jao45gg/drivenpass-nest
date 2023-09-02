import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/sign-up")
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("/sign-in")
  async signIn(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.signIn(createUserDto);
  }
}
