import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private readonly jwtSecret = process.env.JWT_SECRET || 'dev-secret-key-change-in-prod';
  private readonly jwtExpires = process.env.JWT_EXPIRES || '7d';

  /**
   * Register new user
   */
  async register(email: string, password: string, name: string) {
    // Check if user exists
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        language: 'es',
        state: 'active',
        xp: 0,
        level: 1,
        rank: 'Aprendiz',
      },
    });

    // Return without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Validate user credentials
   */
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Generate JWT token
   */
  generateJwt(userId: string, email: string): string {
    return jwt.sign(
      { sub: userId, email },
      this.jwtSecret,
      { expiresIn: this.jwtExpires },
    );
  }

  /**
   * Verify JWT token
   */
  verifyJwt(token: string): string | null {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { sub: string };
      return decoded.sub;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Add XP to user
   */
  async addXp(userId: string, xp: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    let newXp = user.xp + xp;
    let newLevel = user.level;

    // Simple leveling: 100 XP per level
    while (newXp >= 100 * newLevel) {
      newXp -= 100 * newLevel;
      newLevel += 1;
    }

    // Update rank based on level
    let newRank = 'Aprendiz';
    if (newLevel >= 10) newRank = 'Explorador';
    if (newLevel >= 25) newRank = 'Maestro';
    if (newLevel >= 50) newRank = 'Embajador';

    return await this.prisma.user.update({
      where: { id: userId },
      data: { xp: newXp, level: newLevel, rank: newRank },
    });
  }

  /**
   * Update user language
   */
  async updateLanguage(userId: string, language: string) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { language },
    });
  }
}
