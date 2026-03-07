import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import bcrypt from 'node_modules/bcryptjs';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)private usersRepository: Repository<User>) {}

  async findByUsername(username:string){
    return this.usersRepository.findOne({where: {username} });
  }

  async findByEmail(email:string){
    return this.usersRepository.findOne({where: {email} });
  }

  async create(createUserDto: CreateUserDto): Promise <UserResponseDto> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);
    const { password, ...result } = savedUser;
    return result;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
