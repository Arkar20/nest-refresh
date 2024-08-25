import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const user = await this.databaseService.user.create({
      data: createAuthDto,
    });

    const { password, ...rest } = user;

    this.jwtService.sign(rest);
  }

  findAll() {
    return this.databaseService.user.findMany();
  }

  findOne(id: number) {
    return this.databaseService.user.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.databaseService.user.update({
      where: { id },
      data: updateAuthDto,
    });
  }

  remove(id: number) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }

  async validateUser(loginDto: LoginAuthDto) {
    const user = await this.databaseService.user.findFirstOrThrow({
      where: { username: loginDto.username },
    });

    // check password
    const { password, ...rest } = user;

    // sign jwt
    const jwt = this.jwtService.sign(rest);

    return {
      ...user,
      token: jwt,
    };
  }
}
