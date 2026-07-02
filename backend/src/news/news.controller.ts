import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { NewsService } from "./news.service";
import { CreateNewsDto, UpdateNewsDto } from "./news.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PermissionGuard, RequirePermission } from "../auth/permission.guard";

@ApiTags("Yangiliklar (news)")
@RequirePermission("news")
@Controller("news")
export class NewsController {
  constructor(private readonly service: NewsService) {}

  @Get()
  @ApiOperation({ summary: "Yangiliklar ro'yxati (ommaviy — faqat chop etilganlari)" })
  @ApiQuery({ name: "all", required: false, description: "1 — barchasi (admin uchun)" })
  findAll(@Query("all") all?: string) {
    return this.service.findAll(all === "1");
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta yangilik" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Yangilik qo'shish" })
  create(@Body() dto: CreateNewsDto) {
    return this.service.create(dto);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Yangilikni yangilash" })
  update(@Param("id") id: string, @Body() dto: UpdateNewsDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Yangilikni o'chirish" })
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
