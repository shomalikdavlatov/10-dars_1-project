import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import PrismaService from 'src/prisma/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(body: CreateUserDto) {
    const user = await this.prisma.user.findFirst({where: {username: body.username}});
    if (user) throw new ConflictException("Username already registered!");
    return await this.prisma.user.create({data: body});
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({where: {id}});
    if (!user) throw new NotFoundException("User with the specified id not found!");
    return user;
  }
  
  async update(id: string, body: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({where: {id}});
    if (!user) throw new NotFoundException("User with the specified id not found!");
    return await this.prisma.user.update({where: {id}, data: body});
  }
  
  async remove(id: string) {
    const user = await this.prisma.user.findFirst({where: {id}});
    if (!user) throw new NotFoundException("User with the specified id not found!");
    await this.prisma.user.delete({where: {id}});
    return {message: "User has been deleted successfully"};
  }
}
