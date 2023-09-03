import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("DrivenPass - Rest API")
    .setDescription("DrivenPass API description")
    .setVersion("1.0")
    .addTag("DrivenPass")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Server running on PORT:${PORT}`);
}
bootstrap();
