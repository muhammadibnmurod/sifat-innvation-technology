import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { MessagesService } from "./messages.service";
import { CreateMessageDto, UpdateMessageStatusDto } from "./messages.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PermissionGuard, RequirePermission } from "../auth/permission.guard";

@ApiTags("Xabarlar (messages)")
@RequirePermission("messages")
@Controller("messages")
export class MessagesController {
  constructor(private readonly service: MessagesService) {}

  @Post()
  @ApiOperation({ summary: "Murojaat yuborish (ommaviy — saytdagi forma)" })
  create(@Body() dto: CreateMessageDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Xabarlar ro'yxati (admin)" })
  @ApiQuery({ name: "status", required: false, enum: ["new", "read", "answered"] })
  findAll(@Query("status") status?: string) {
    return this.service.findAll(status);
  }

  @Get("unread-count")
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "O'qilmagan xabarlar soni" })
  unreadCount() {
    return this.service.unreadCount();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Bitta xabar" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Xabar statusini o'zgartirish" })
  update(@Param("id") id: string, @Body() dto: UpdateMessageStatusDto) {
    return this.service.updateStatus(id, dto.status);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Xabarni o'chirish" })
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
