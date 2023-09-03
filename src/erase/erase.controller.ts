import { Body, Controller, Delete, UseGuards } from "@nestjs/common";
import { EraseService } from "./erase.service";
import { EraseDto } from "./dto/create-erase.dto";
import { User } from "../users/decorators/user-decorator.decorator";
import { users } from "@prisma/client";
import { AuthGuard } from "../auth/auth-guard.guard";

@UseGuards(AuthGuard)
@Controller("erase")
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @Delete()
  async remove(@Body() eraseDto: EraseDto, @User() usuario: users) {
    return await this.eraseService.remove(eraseDto, usuario);
  }
}
