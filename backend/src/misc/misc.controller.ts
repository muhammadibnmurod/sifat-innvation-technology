import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DatabaseService } from "../database/database.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Tizim")
@Controller()
export class MiscController {
  constructor(private readonly dbs: DatabaseService) {}

  @Get("health")
  @ApiOperation({ summary: "API holati" })
  health() {
    return { ok: true };
  }

  @Get("stats")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Dashboard statistikasi (admin)" })
  stats() {
    const c = (sql: string) => (this.dbs.prepare(sql).get() as any).c;
    return {
      services: c("SELECT COUNT(*) c FROM services"),
      news: c("SELECT COUNT(*) c FROM news"),
      partners: c("SELECT COUNT(*) c FROM partners"),
      newMessages: c("SELECT COUNT(*) c FROM messages WHERE status = 'new'"),
      latestMessages: this.dbs
        .prepare("SELECT * FROM messages ORDER BY id DESC LIMIT 5")
        .all(),
      latestNews: this.dbs
        .prepare("SELECT id, title, date, published FROM news ORDER BY date DESC, id DESC LIMIT 5")
        .all(),
    };
  }
}
