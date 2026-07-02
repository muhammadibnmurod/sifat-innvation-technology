import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const PERMISSION_KEY = "required_permission";

// Controller yoki metod ustiga qo'yiladi: @RequirePermission("news")
export const RequirePermission = (permission: string) =>
  SetMetadata(PERMISSION_KEY, permission);

// Admin hamma narsaga ruxsatli; user faqat o'ziga berilgan bo'limlarga kiradi.
// JwtAuthGuard'dan keyin ishlatiladi (req.user mavjud bo'lishi kerak).
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required) return true;

    const user = context.switchToHttp().getRequest().user;
    if (user?.role === "admin") return true;

    const perms: string[] = Array.isArray(user?.permissions) ? user.permissions : [];
    if (perms.includes(required)) return true;

    throw new ForbiddenException("Bu bo'limga ruxsatingiz yo'q");
  }
}
