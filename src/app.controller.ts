import { Controller, Get, HttpStatus } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("app")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/health")
  @ApiOperation({ summary: "Check if the application is running" })
  @ApiResponse({ status: HttpStatus.OK })
  getHello(): string {
    return this.appService.getHello();
  }
}
