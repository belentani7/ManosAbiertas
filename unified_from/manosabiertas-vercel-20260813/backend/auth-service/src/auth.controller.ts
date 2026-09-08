import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  HttpCode,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { runValidationPipeline, throwOnValidationError } from '../shared-lib/validation/pvc-u';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() dto: { email: string; password: string; name: string }) {
    // Validación PVC-U
    const validations = runValidationPipeline(dto, {
      structure: { email: 'string', password: 'string', name: 'string' },
      email: dto.email,
      password: dto.password,
    });
    throwOnValidationError(validations);

    try {
      const user = await this.authService.register(dto.email, dto.password, dto.name);
      const token = this.authService.generateJwt(user.id, user.email);

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      };
    } catch (error) {
      if (error.message.includes('unique constraint')) {
        throw new BadRequestException('Email already registered');
      }
      throw error;
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: { email: string; password: string }) {
    // Validación PVC-U
    const validations = runValidationPipeline(dto, {
      structure: { email: 'string', password: 'string' },
      email: dto.email,
    });
    throwOnValidationError(validations);

    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.authService.generateJwt(user.id, user.email);

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        xp: user.xp,
        level: user.level,
        rank: user.rank,
      },
      token,
    };
  }

  @Get('me')
  @HttpCode(200)
  async getMe(@Headers('authorization') authHeader: string) {
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token');
    }

    const token = authHeader.substring(7);
    const userId = this.authService.verifyJwt(token);

    if (!userId) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.authService.getUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        xp: user.xp,
        level: user.level,
        rank: user.rank,
        createdAt: user.createdAt,
      },
    };
  }

  @Post('verify-token')
  @HttpCode(200)
  async verifyToken(@Body() dto: { token: string }) {
    const userId = this.authService.verifyJwt(dto.token);

    if (!userId) {
      return { valid: false };
    }

    return { valid: true, userId };
  }
}
