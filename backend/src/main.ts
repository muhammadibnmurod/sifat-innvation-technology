import "dotenv/config";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpErrorFilter } from "./common/http-error.filter";
import { UPLOADS_DIR } from "./config";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, stopAtFirstError: true })
  );
  app.useGlobalFilters(new HttpErrorFilter());

  // Yuklangan rasmlar: /uploads/...
  app.useStaticAssets(UPLOADS_DIR, { prefix: "/uploads/", maxAge: "7d" });

  // Swagger — /api/docs
  const config = new DocumentBuilder()
    .setTitle("Sifat Innovatsion Texnologiya API")
    .setDescription(
      "Sayt kontenti (xizmatlar, yangiliklar, hamkorlar, FAQ, sozlamalar) va murojaatlarni boshqarish API'si. " +
        "Yozish (POST/PUT/DELETE) amallari uchun avval /api/auth/login orqali token oling va 'Authorize' tugmasi bilan kiriting."
    )
    .setVersion("2.0")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "access-token"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document, {
    customSiteTitle: "Sifat API Docs",
    swaggerOptions: { persistAuthorization: true },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`[server] API http://localhost:${port}`);
  console.log(`[server] Swagger http://localhost:${port}/api/docs`);
}
bootstrap();
