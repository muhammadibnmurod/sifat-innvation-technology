import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { DatabaseService } from "../database/database.service";
import { CreateUserDto, UpdateUserDto } from "./users.dto";

const PUBLIC_COLS = "id, email, name, role, permissions, created_at";

@Injectable()
export class UsersService {
  constructor(private readonly dbs: DatabaseService) {}

  private toPublic(row: any) {
    if (!row) return row;
    let permissions: string[] = [];
    try {
      permissions = JSON.parse(row.permissions || "[]");
    } catch {
      permissions = [];
    }
    return { ...row, permissions };
  }

  findAll() {
    return (this.dbs.prepare(`SELECT ${PUBLIC_COLS} FROM users ORDER BY id ASC`).all() as any[]).map(
      (r) => this.toPublic(r)
    );
  }

  findOne(id: number | string) {
    const row = this.dbs.prepare(`SELECT ${PUBLIC_COLS} FROM users WHERE id = ?`).get(id);
    if (!row) throw new NotFoundException("Foydalanuvchi topilmadi");
    return this.toPublic(row);
  }

  create(dto: CreateUserDto) {
    const email = dto.email.trim().toLowerCase();
    if (this.dbs.prepare("SELECT id FROM users WHERE email = ?").get(email))
      throw new ConflictException("Bu email allaqachon ro'yxatdan o'tgan");

    const info = this.dbs
      .prepare(
        "INSERT INTO users (email, password_hash, name, role, permissions) VALUES (?, ?, ?, ?, ?)"
      )
      .run(
        email,
        bcrypt.hashSync(dto.password, 10),
        dto.name.trim(),
        dto.role === "admin" ? "admin" : "user",
        JSON.stringify(dto.permissions ?? [])
      );
    return this.findOne(info.lastInsertRowid as number);
  }

  update(id: number | string, dto: UpdateUserDto, currentUserId: number) {
    const existing: any = this.dbs.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!existing) throw new NotFoundException("Foydalanuvchi topilmadi");

    // Admin o'zining rolini pasaytira olmaydi.
    if (
      Number(id) === Number(currentUserId) &&
      dto.role &&
      dto.role !== "admin" &&
      existing.role === "admin"
    )
      throw new ForbiddenException("O'zingizning admin rolingizni o'zgartira olmaysiz");

    // Oxirgi adminni oddiy user qilib bo'lmaydi.
    if (existing.role === "admin" && dto.role === "user" && this.adminCount() <= 1)
      throw new BadRequestException("Tizimda kamida bitta admin qolishi kerak");

    const sets: string[] = [];
    const values: any[] = [];

    if (dto.name !== undefined) {
      if (!dto.name.trim()) throw new BadRequestException("Ism bo'sh bo'lishi mumkin emas");
      sets.push("name = ?");
      values.push(dto.name.trim());
    }
    if (dto.email !== undefined) {
      const email = dto.email.trim().toLowerCase();
      const dup: any = this.dbs
        .prepare("SELECT id FROM users WHERE email = ? AND id != ?")
        .get(email, id);
      if (dup) throw new ConflictException("Bu email allaqachon ro'yxatdan o'tgan");
      sets.push("email = ?");
      values.push(email);
    }
    if (dto.password !== undefined && dto.password !== "") {
      if (dto.password.length < 6)
        throw new BadRequestException("Parol kamida 6 ta belgidan iborat bo'lsin");
      sets.push("password_hash = ?");
      values.push(bcrypt.hashSync(dto.password, 10));
    }
    if (dto.role !== undefined) {
      sets.push("role = ?");
      values.push(dto.role === "admin" ? "admin" : "user");
    }
    if (dto.permissions !== undefined) {
      sets.push("permissions = ?");
      values.push(JSON.stringify(dto.permissions ?? []));
    }

    if (sets.length > 0)
      this.dbs.prepare(`UPDATE users SET ${sets.join(", ")} WHERE id = ?`).run(...values, id);

    return this.findOne(id);
  }

  remove(id: number | string, currentUserId: number) {
    const existing: any = this.dbs.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!existing) throw new NotFoundException("Foydalanuvchi topilmadi");

    if (Number(id) === Number(currentUserId))
      throw new ForbiddenException("O'zingizni o'chira olmaysiz");

    if (existing.role === "admin" && this.adminCount() <= 1)
      throw new BadRequestException("Tizimda kamida bitta admin qolishi kerak");

    this.dbs.prepare("DELETE FROM users WHERE id = ?").run(id);
    return { ok: true };
  }

  private adminCount(): number {
    return (this.dbs.prepare("SELECT COUNT(*) c FROM users WHERE role = 'admin'").get() as any).c;
  }
}
