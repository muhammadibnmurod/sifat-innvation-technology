import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { CreateMessageDto } from "./messages.dto";

@Injectable()
export class MessagesService {
  constructor(private readonly dbs: DatabaseService) {}

  create(dto: CreateMessageDto) {
    const info = this.dbs
      .prepare("INSERT INTO messages (name, phone, email, message) VALUES (?, ?, ?, ?)")
      .run(
        dto.name.trim(),
        String(dto.phone || "").trim(),
        String(dto.email || "").trim(),
        dto.message.trim()
      );
    return { ok: true, id: info.lastInsertRowid };
  }

  findAll(status?: string) {
    return status
      ? this.dbs.prepare("SELECT * FROM messages WHERE status = ? ORDER BY id DESC").all(status)
      : this.dbs.prepare("SELECT * FROM messages ORDER BY id DESC").all();
  }

  unreadCount() {
    const row: any = this.dbs
      .prepare("SELECT COUNT(*) c FROM messages WHERE status = 'new'")
      .get();
    return { count: row.c };
  }

  findOne(id: string) {
    const row = this.dbs.prepare("SELECT * FROM messages WHERE id = ?").get(id);
    if (!row) throw new NotFoundException("Topilmadi");
    return row;
  }

  updateStatus(id: string, status: string) {
    const info = this.dbs
      .prepare("UPDATE messages SET status = ? WHERE id = ?")
      .run(status, id);
    if (info.changes === 0) throw new NotFoundException("Topilmadi");
    return this.findOne(id);
  }

  remove(id: string) {
    const info = this.dbs.prepare("DELETE FROM messages WHERE id = ?").run(id);
    if (info.changes === 0) throw new NotFoundException("Topilmadi");
    return { ok: true };
  }
}
