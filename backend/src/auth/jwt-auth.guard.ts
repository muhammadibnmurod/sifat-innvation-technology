import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly dbs: DatabaseService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const header: string = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) throw new UnauthorizedException("Avtorizatsiya talab qilinadi");

    let payload: any;
    try {
      payload = this.jwt.verify(token);
    } catch {
      throw new UnauthorizedException("Token yaroqsiz yoki muddati tugagan");
    }

    // Rol va ruxsatlarni har doim bazadan yangilab olamiz —
    // eski tokenlar ham ishlaydi, ruxsat o'zgarishi darhol kuchga kiradi.
    const user: any = this.dbs
      .prepare("SELECT id, email, name, role, permissions FROM users WHERE id = ?")
      .get(payload.id);
    if (!user) throw new UnauthorizedException("Foydalanuvchi topilmadi");

    let permissions: string[] = [];
    try {
      const parsed = JSON.parse(user.permissions || "[]");
      permissions = Array.isArray(parsed) ? parsed : [];
    } catch {
      permissions = [];
    }

    req.user = { ...user, permissions };
    return true;
  }
}
