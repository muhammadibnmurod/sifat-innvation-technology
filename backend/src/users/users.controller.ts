import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./users.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminGuard } from "../auth/admin.guard";
import { PERMISSIONS } from "../auth/permissions";

// Foydalanuvchilarni boshqarish — faqat admin uchun.
@ApiTags("Foydalanuvchilar (users)")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get("permissions/all")
  @ApiOperation({ summary: "Mavjud bo'lim ruxsatlari ro'yxati" })
  permissions() {
    return { permissions: PERMISSIONS };
  }

  @Get()
  @ApiOperation({ summary: "Foydalanuvchilar ro'yxati (faqat admin)" })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta foydalanuvchi" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Yangi foydalanuvchi qo'shish va ruxsat berish" })
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Foydalanuvchini yangilash (ism, username, parol, rol, ruxsatlar)" })
  update(@Param("id") id: string, @Body() dto: UpdateUserDto, @Req() req: any) {
    return this.service.update(id, dto, req.user.id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Foydalanuvchini o'chirish" })
  remove(@Param("id") id: string, @Req() req: any) {
    return this.service.remove(id, req.user.id);
  }
}
