import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { DatabaseService } from "../database/database.service";

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

    const payload = { id: user.id, email: user.email, name: user.name };
    return { token: this.jwt.sign(payload), user: payload };
  }

  me(userId: number) {
    const user = this.dbs
      .prepare("SELECT id, email, name FROM users WHERE id = ?")
      .get(userId);
    if (!user) throw new UnauthorizedException("Foydalanuvchi topilmadi");
    return { user };
  }
}
