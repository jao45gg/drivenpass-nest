import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/sign-up")
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: HttpStatus.CREATED })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("/sign-in")
  @ApiOperation({ summary: "Sign-in in the application" })
  @ApiResponse({ status: HttpStatus.OK, description: "Return a JWT token" })
  async signIn(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.signIn(createUserDto);
  }
}
