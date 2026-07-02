import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { ServicesController } from "./services/services.controller";
import { ServicesService } from "./services/services.service";
import { NewsController } from "./news/news.controller";
import { NewsService } from "./news/news.service";
import { PartnersController } from "./partners/partners.controller";
import { PartnersService } from "./partners/partners.service";
import { FaqController } from "./faq/faq.controller";
import { FaqService } from "./faq/faq.service";
import { MessagesController } from "./messages/messages.controller";
import { MessagesService } from "./messages/messages.service";
import { SettingsController } from "./settings/settings.controller";
import { UploadController } from "./upload/upload.controller";
import { MiscController } from "./misc/misc.controller";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [
    ServicesController,
    NewsController,
    PartnersController,
    FaqController,
    MessagesController,
    SettingsController,
    UploadController,
    MiscController,
    UsersController,
  ],
  providers: [ServicesService, NewsService, PartnersService, FaqService, MessagesService, UsersService],
})
export class AppModule {}
