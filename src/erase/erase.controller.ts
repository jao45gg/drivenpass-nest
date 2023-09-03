import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { EraseService } from "./erase.service";
import { EraseDto } from "./dto/create-erase.dto";
import { User } from "../users/decorators/user-decorator.decorator";
import { users } from "@prisma/client";
import { AuthGuard } from "../auth/auth-guard.guard";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

@ApiTags("erase")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("erase")
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @Delete()
  @ApiOperation({ summary: " Delete own account" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: " Delete own account",
  })
  async remove(@Body() eraseDto: EraseDto, @User() usuario: users) {
    return await this.eraseService.remove(eraseDto, usuario);
  }
}
