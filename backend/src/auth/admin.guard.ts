import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

// Faqat role = 'admin' bo'lgan foydalanuvchilarga ruxsat (JwtAuthGuard'dan keyin ishlatiladi).
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest().user;
    if (user?.role === "admin") return true;
    throw new ForbiddenException("Bu amal faqat admin uchun");
  }
}
