import { BadRequestException, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

export interface CrudField {
  name: string;
  required?: boolean;
  default?: any;
}

export interface CrudConfig {
  table: string;
  fields: CrudField[];
  orderBy?: string;
  publicFilter?: string;
}

// Oddiy jadvallar (services, news, partners, faq) uchun umumiy REST xizmat.
export abstract class CrudService {
  protected abstract readonly config: CrudConfig;

  constructor(protected readonly dbs: DatabaseService) {}

  private get orderBy() {
    return this.config.orderBy || "sort_order ASC, id ASC";
  }

  findAll(all: boolean) {
    const where = !all && this.config.publicFilter ? `WHERE ${this.config.publicFilter}` : "";
    return this.dbs
      .prepare(`SELECT * FROM ${this.config.table} ${where} ORDER BY ${this.orderBy}`)
      .all();
  }

  findOne(id: number | string) {
    const row = this.dbs
      .prepare(`SELECT * FROM ${this.config.table} WHERE id = ?`)
      .get(id);
    if (!row) throw new NotFoundException("Topilmadi");
    return row;
  }

  create(body: Record<string, any>) {
    for (const f of this.config.fields) {
      if (f.required && !String(body?.[f.name] ?? "").trim())
        throw new BadRequestException(`"${f.name}" maydoni to'ldirilishi shart`);
    }
    const names = this.config.fields.map((f) => f.name);
    const values = this.config.fields.map((f) => normalize(body?.[f.name], f));
    const info = this.dbs
      .prepare(
        `INSERT INTO ${this.config.table} (${names.join(",")}) VALUES (${names.map(() => "?").join(",")})`
      )
      .run(...values);
    return this.findOne(info.lastInsertRowid as number);
  }

  update(id: number | string, body: Record<string, any>) {
    const existing = this.findOne(id);
    const updates = this.config.fields.filter((f) => body?.[f.name] !== undefined);
    if (updates.length === 0) return existing;
    const setSql = updates.map((f) => `${f.name} = ?`).join(", ");
    const values = updates.map((f) => normalize(body[f.name], f));
    this.dbs
      .prepare(`UPDATE ${this.config.table} SET ${setSql} WHERE id = ?`)
      .run(...values, id);
    return this.findOne(id);
  }

  remove(id: number | string) {
    const info = this.dbs.prepare(`DELETE FROM ${this.config.table} WHERE id = ?`).run(id);
    if (info.changes === 0) throw new NotFoundException("Topilmadi");
    return { ok: true };
  }

  reorder(ids: unknown) {
    if (!Array.isArray(ids)) throw new BadRequestException("ids massivi kerak");
    const stmt = this.dbs.prepare(`UPDATE ${this.config.table} SET sort_order = ? WHERE id = ?`);
    const tx = this.dbs.transaction(() => ids.forEach((id, i) => stmt.run(i + 1, id)));
    tx();
    return this.dbs
      .prepare(`SELECT * FROM ${this.config.table} ORDER BY ${this.orderBy}`)
      .all();
  }
}

function normalize(value: any, field: CrudField) {
  if (value === undefined || value === null) value = field.default ?? "";
  if (typeof value === "boolean") return value ? 1 : 0;
  return value;
}
