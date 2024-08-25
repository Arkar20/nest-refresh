import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService) {}
  create(createAuthDto: CreateAuthDto) {
    return this.databaseService.user.create({
      data: createAuthDto,
    });
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
}
