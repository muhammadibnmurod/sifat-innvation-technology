import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DatabaseService } from "../database/database.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Sozlamalar (settings)")
@Controller("settings")
export class SettingsController {
  constructor(private readonly dbs: DatabaseService) {}

  private read(): Record<string, any> {
    const row: any = this.dbs.prepare("SELECT data FROM settings WHERE id = 1").get();
    return row ? JSON.parse(row.data) : {};
  }

  @Get()
  @ApiOperation({ summary: "Sayt sozlamalari (ommaviy): kontakt, hero, statistika, video" })
  get() {
    return this.read();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Sozlamalarni yangilash (yuborilgan maydonlar birlashtiriladi)" })
  @ApiBody({
    schema: {
      type: "object",
      example: {
        phone: "+998 99 866 02 71",
        email: "info@sifat.uz",
        address: "Toshkent shahri",
        working_hours: "Du–Sha, 9:00 – 18:00",
        socials: { telegram: "https://t.me/sifat" },
        hero_title: "Yuk ko'taruvchi kranlarni **professional** ta'mirlash",
        stats: { experience: 10, projects: 500, clients: 120, services: 15 },
        video_url: "https://www.youtube.com/watch?v=...",
      },
    },
  })
  update(@Body() body: Record<string, any>) {
    const merged = { ...this.read(), ...(body || {}) };
    this.dbs.prepare("UPDATE settings SET data = ? WHERE id = 1").run(JSON.stringify(merged));
    return merged;
  }
}
