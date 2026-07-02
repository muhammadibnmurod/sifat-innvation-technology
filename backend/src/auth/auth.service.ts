import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { DatabaseService } from "../database/database.service";

function parsePermissions(raw: unknown): string[] {
  try {
    const arr = JSON.parse(String(raw || "[]"));
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

@Injectable()
export class AuthService {
  constructor(
    private readonly dbs: DatabaseService,
    private readonly jwt: JwtService
  ) {}

  login(email: string, password: string) {
    const user: any = this.dbs
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(String(email).trim().toLowerCase());

    if (!user || !bcrypt.compareSync(password, user.password_hash))
      throw new UnauthorizedException("Email yoki parol noto'g'ri");

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || "user",
      permissions: parsePermissions(user.permissions),
    };
    return { token: this.jwt.sign(payload), user: payload };
  }

  me(userId: number) {
    const user: any = this.dbs
      .prepare("SELECT id, email, name, role, permissions FROM users WHERE id = ?")
      .get(userId);
    if (!user) throw new UnauthorizedException("Foydalanuvchi topilmadi");
    return { user: { ...user, permissions: parsePermissions(user.permissions) } };
  }
}
