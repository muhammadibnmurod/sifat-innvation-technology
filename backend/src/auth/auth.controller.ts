import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Admin login — JWT token olish (8 soat amal qiladi)" })
  @ApiOkResponse({ description: "{ token, user }" })
  @ApiUnauthorizedResponse({ description: "Email yoki parol noto'g'ri" })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Joriy admin ma'lumotlari (token tekshiruvi)" })
  me(@Req() req: any) {
    return this.auth.me(req.user.id);
  }
}
